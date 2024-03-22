// Import the React and ReactDOM libraries
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
//Import App
import App, { MainApp } from './App';
// Import axios
const queryClient = new QueryClient();
// Import BrowserRouter, Routes, and Route from react-router-dom
//Get a reference to the div with ID root
const el = document.getElementById("root");
//Tell React to take control of that element
const root = ReactDOM.createRoot(el);
//Show the component on the screen wrapped with BrowserRouter and Routes
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);



