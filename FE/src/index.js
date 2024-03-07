// Import the React and ReactDOM libraries
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
//Import App
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import App from "./App";
//Import Chakra
import { ChakraProvider } from "@chakra-ui/react";
// Import BrowserRouter, Routes, and Route from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Get a reference to the div with ID root
const el = document.getElementById("root");
//Tell React to take control of that element
const root = ReactDOM.createRoot(el);

//Show the component on the screen wrapped with BrowserRouter and Routes
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Placeholder to add more Route components here for other paths */}
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
