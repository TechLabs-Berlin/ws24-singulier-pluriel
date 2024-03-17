// Import the React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom/client";
//Import App
import App from "./App";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
//Import Chakra
import { ChakraProvider } from "@chakra-ui/react";
// Import BrowserRouter, Routes, and Route from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
//Get a reference to the div with ID root
const el = document.getElementById("root");
//Tell React to take control of that element
const root = ReactDOM.createRoot(el);

//Show the component on the screen wrapped with BrowserRouter and Routes
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            {/* Placeholder to add more Route components here for other paths */}
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
