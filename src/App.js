import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

//doesnt matter what the key is called
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  //useState([]) -- default state of an empty array
  //useState returns array
  //destructure array and set it to a variable
  //'todos' is every todos inside of todos state
  //'setTodos' is the function that updates todos
  const [todos, setTodos] = useState([]);

  //name of todo taken from user input using useRef
  const todoNameRef = useRef([]);


  //useEffect is a function that takes a function as its first parameter
  //this parameter function is a function that we want to do things
  //the second parameter is an array of properties, this array is
  //all of our dependencies (when anything in this array changes we run useEffect)
  //this useEffect function only gets called once because of the empty array,
  //this sets our todos to our stored todos only if we have stored todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  //using localStorage to save Todos so they dont dissapear on refresh
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    //always make a copy before modifying, use copy to set new state
    const newTodos = [...todos];
    //set todo to the copy of todos with the id that matches the input id
    const todo = newTodos.find((todo) => todo.id === id);
    //false <-> true
    todo.complete = !todo.complete;
    //update todos
    setTodos(newTodos);
  }

  //useRef hook imported above alows us to reference elements
  //inside our HTML (input in this case)
  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    //if empty todo is entered simply return to avoid adding empty todo
    if (name === "") return;
    //sets todos to previous todos and adds a new one
    //uuid is a library used to create random ids
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  //sets todos to only the todos that are not complete, removing compleated todos
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  //what is being returned (content of the app)
  //return can only return 1 element
  //wrap items inside of an empy element called a fragment "<></>"
  //so return returns 1 element
  //<TodoList todos={todos} -- prop todos on TodoList gets pased '{todos}' variable
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Compleated</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
