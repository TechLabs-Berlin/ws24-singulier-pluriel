import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthApi from "./AuthApi";
import Login from "./pages/login";
import MainApp from "./pages/MainApp";
import Courses from "./pages/courses";
import CourseDetail from "./components/CourseDetail";

function App() {
  const [auth, setAuth] = useState({ loggedIn: false, user: null }); // State to keep track of authentication status

  // PrivateRoute component for authentication logic
  const PrivateRoute = () => {
    return auth.loggedIn ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainApp />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course-detail/:courseId" element={<CourseDetail />} />
        </Route>
      </Routes>
    </AuthApi.Provider>
  );
}

export default App;
