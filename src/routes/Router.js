import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import SmartVoice from "../pages/call-charges/call-charges.component";
import Spam from "../pages/campaign";
import Login from "../pages/login";
import Profile from "../pages/profile";
// import AuthService from "../services/auth.service";

// const AuthRouter = () => {
//   const user = AuthService.getCurrentUser();
//   return user ? <Outlet /> : <Navigate to="/login" replace />;
// };

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="spam" element={<Spam />} />
      <Route path="smartvoice" element={<SmartVoice />} />
    </Routes>
  );
};

export default Router;
