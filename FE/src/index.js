// Import the React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom/client";
//Import axios
import axios from "axios";
//Import Chakra UI
import { ChakraProvider } from "@chakra-ui/react";
// Import BrowserRouter, Routes, and Route from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import react-query
import { QueryClient, QueryClientProvider } from "react-query";
//Import App components
import App from "./App";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";

//Configure axios to send cookies with every request
axios.defaults.withCredentials = true;

// Create a queryClient with global configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries globally for queries
    },
    mutations: {
      retry: false, // Disable retries globally for mutations
    },
  },
});

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
            <Route path="/" element={<Login />} />
            {/* Show Login as the default route */}
            <Route path="/main" element={<App />} />
            {/* Main page after login */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            {/* Placeholder to add more Route components here for other paths */}
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
