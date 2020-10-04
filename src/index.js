import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//renders everthing inside <App /> component inside 'root' element 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
