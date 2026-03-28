import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

export default function App() {
  const [mode, setMode] = useState("register"); // "register" or "login"

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<AuthForm mode={mode} setMode={setMode} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
