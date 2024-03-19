import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { mock } from "./components/mock";
import { TaskData, Task } from "./model";
import { v4 as uuid } from "uuid";

const App: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [tasks, setTasks] = useState<TaskData>(mock);

  // add new task to toDo items in tasks state on form submit 
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTasks = { ...tasks };
    if (title && description) {
      updatedTasks.tasks.todoItems = [
        ...updatedTasks.tasks.todoItems,
        { id: uuid(), title: title, description: description },
      ];
      setTasks(updatedTasks);
    }
  };

  // function to call endpoint to fetch tasks from api
  const getData = async () => {
    axios
      .get("endpoint")
      .then((response: any) => {
        const newData: Task[] = response.data;
        setTasks({
          tasks: {
            todoItems: newData.filter((item: Task) => item.status === "TO_DO"),
            inProgressItems: newData.filter(
              (item: Task) => item.status === "IN_PROGRESS"
            ),
            doneItems: newData.filter((item: Task) => item.status === "DONE"),
          },
        });
      })
      .catch(function (error: any) {
        // placeholder for potential server error
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <form onSubmit={(e) => handleAdd(e)}>
        <input
          placeholder="name*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <textarea
          placeholder="description*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="App">
        {tasks.tasks.todoItems.map((task) => (
          <div>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>
        ))}
        {tasks.tasks.inProgressItems.map((task) => (
          <div>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>
        ))}
        {tasks.tasks.doneItems.map((task) => (
          <div>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;

// import React, { useState } from "react";
// import "./App.css";
// import InputFeild from "./components/InputFeild";
// import { Todo } from "./model";
// import TodoList from "./components/TodoList";
// import { DragDropContext, DropResult } from "react-beautiful-dnd";

// const App: React.FC = () => {
//   const [todo, setTodo] = useState<string>("");
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

//   const handleAdd = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (todo) {
//       setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
//       setTodo("");
//     }
//   };

//   const onDragEnd = (result: DropResult) => {
//     const { destination, source } = result;

//     console.log(result);

//     if (!destination) {
//       return;
//     }

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     let add;
//     let active = todos;
//     let complete = completedTodos;
//     // Source Logic
//     if (source.droppableId === "TodosList") {
//       add = active[source.index];
//       active.splice(source.index, 1);
//     } else {
//       add = complete[source.index];
//       complete.splice(source.index, 1);
//     }

//     // Destination Logic
//     if (destination.droppableId === "TodosList") {
//       active.splice(destination.index, 0, add);
//     } else {
//       complete.splice(destination.index, 0, add);
//     }

//     setCompletedTodos(complete);
//     setTodos(active);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="App">
//         <span className="heading">Taskify</span>
//         <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
//         <TodoList
//           todos={todos}
//           completedTodos={completedTodos}
//           setTodos={setTodos}
//           setCompletedTodos={setCompletedTodos}
//         />
//       </div>
//     </DragDropContext>
//   );
// };

// export default App;
