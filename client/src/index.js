// Import the React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom/client";
// Import Chakra UI for styling
import { ChakraProvider } from "@chakra-ui/react";
// Import BrowserRouter from react-router-dom for routing
import { BrowserRouter } from "react-router-dom";
// Import react-query and configure queryClient
import { QueryClient, QueryClientProvider } from "react-query";
// Import App component
import App from "./App";
import AuthApi from "./AuthApi";
import { NavigationProvider } from "./NavigationContext";

// Configure axios to send credentials with every request
import axios from "axios";
axios.defaults.withCredentials = true;

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }, // Disable retries globally
    mutations: { retry: false }, // Disable retries globally
  },
});

// Render the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthApi.Provider
            value={
              {
                /*Placeholder*/
              }
            }
          >
            <NavigationProvider>
              <App />
            </NavigationProvider>
          </AuthApi.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
