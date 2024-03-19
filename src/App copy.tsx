import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { mock } from "./components/mock";
import { TaskData, Tasks, Task } from "./model";
import uuid from "uuid";


const App: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [tasks, setTasks] = useState<TaskData>(mock);

  // Function to add a new item to todoItems
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // Clone the existing tasks object
    const updatedTasks = { ...tasks };

    // Clone the todoItems array and add the new item
    if (title && description) {
      updatedTasks.tasks.todoItems = [...updatedTasks.tasks.todoItems, {id: uuid.v4(), title: title, description: description}];

      // Update state with the modified tasks object
      setTasks(updatedTasks);
    }
  };

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
        // handle potential server error placeholder
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <form onSubmit={(e) => handleAdd(e)}>
        <input placeholder="name*" value={title} required></input>
        <textarea
          placeholder="description*"
          value={description}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="App">test</div>
    </>
  );
};

export default App;
