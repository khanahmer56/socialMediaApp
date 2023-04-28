import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import User from "./pages/User";
import Profile from "./pages/Profile";
import Comments from "./components/Comments";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/protected/dashboard" element={<Dashboard />} />
        <Route path="/protected/user" element={<User />} />
        <Route path="/protected/profile/:id" element={<Profile />} />
        <Route path="/protected/comment/:id" element={<Comments />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
