// Import the React and ReactDOM libraries
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
//Import App
import App from "./App";
// Import axios
import axios from "axios";
// Import BrowserRouter, Routes, and Route from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Get a reference to the div with ID root
const el = document.getElementById("root");
//Tell React to take control of that element
const root = ReactDOM.createRoot(el);

//Show the component on the screen wrapped with BrowserRouter and Routes
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {/* You can add more Route components here for other paths */}
    </Routes>
  </BrowserRouter>
);
