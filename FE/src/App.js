import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthApi from "./pages/AuthApi";
import Login from "./pages/login";
import MainApp from "./pages/MainApp";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";

function App() {
  const [auth, setAuth] = useState(false); // State to keep track of authentication status

  // PrivateRoute component for authentication logic
  const PrivateRoute = () => {
    return auth ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      {" "}
      {/* Provide the AuthApi context */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainApp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
        </Route>
      </Routes>
    </AuthApi.Provider>
  );
}

export default App;
