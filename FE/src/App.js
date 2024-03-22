
// Import the React and ReactDOM libraries
import { React, Suspense, useContext, useEffect, useState } from 'react';
// Import BrowserRouter, Routes, and Route from react-router-dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
  redirect,
  Routes
} from "react-router-dom";
//Import Chakra
import { ChakraProvider } from "@chakra-ui/react";
import axios from 'axios';
import Courses from "./pages/courses";
import MainCard from "./MainCard";
import AuthApi from './AuthApi';
import Login from './pages/login'
import Dashboard from './pages/dashboard';
import { Outlet, Navigate } from 'react-router-dom'
// const Dashboard = React.lazy(() => import("./pages/dashboard"));
// const Login = React.lazy(() => import("./pages/login"));




function MainApp() {
  const Auth = useContext(AuthApi);
  return (
    <div>
      <Box>
        <Text fontStyle="italic" m={4}>
          Universita Libera di Livorno
        </Text>
        <UserProfile />
        <Flex
          direction="column"
          alignItems="center"
          mt={{ base: "100px", md: "24px" }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            wrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            <MainCard title="Courses" />
            <MainCard title="Communication & Announcements" />
            <MainCard title="Grade Center" />
          </Flex>
          <SearchBar />
          <Dashboard />
        </Flex>
      </Box>
      <Suspense fallback={<div><h5>Loading....</h5></div>}>
        <Dashboard />
        <button onClick={() => Auth.setAuth(false)}>Logout</button>

      </Suspense>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
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
    </AuthApi.Provider>
  )
}
const PrivateRoutes = (auth) => {
  const Auth = useContext(AuthApi);
  return (
    Auth.auth ? <Outlet /> : <Navigate to="/login" />
  )
}
const PrivateLogin = (auth) => {
  const Auth = useContext(AuthApi);

  return (
    !Auth.auth ? <Outlet /> : <Navigate to="/" />
  )
}

export default App;