import React from "react";
import { Todo } from "../model";
import "./TodoList.css";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

type Props = {
  todos: Todo[];
  completedTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoList = ({
  todos,
  completedTodos,
  setTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragActive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.length > 0 &&
              todos.map((t, index) => (
                <SingleTodo
                  index={index}
                  todo={t}
                  key={t.id}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos  ${
              snapshot.isDraggingOver ? "dragComplete" : "remove"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.length > 0 &&
              completedTodos.map((t, index) => (
                <SingleTodo
                  index={index}
                  todo={t}
                  key={t.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
