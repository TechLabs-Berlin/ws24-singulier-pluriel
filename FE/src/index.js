// Import the React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom/client";

//Get a reference to the div with ID root
const el = document.getElementById("root");
//Tell React to take control of that element
const root = ReactDOM.createRoot(el);

//Create a component
function App() {
  return <h1> Hello, world</h1>;
}

//Show the component on the screen
root.render(<App />);
