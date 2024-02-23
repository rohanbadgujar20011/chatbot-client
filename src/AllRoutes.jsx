import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./components/SetAvatar";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
