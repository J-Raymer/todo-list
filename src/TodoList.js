import React from "react";
import Todo from "./Todo";

//list of todos, this gets rendered in app.js
export default function TodoList({ todos, toggleTodo }) {
  return todos.map((todo) => {
    //key has to be unique for the array you are using it with
    //key allows react to re-render only the components that change
    //instead of re-rendering all 
    return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
  });
}
