import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Home } from "./pages/Home";
import { ClientDetails } from "./pages/ClientDetails";


export default function App() {
  return (
      <Router>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/ClientDetails" element={<ClientDetails/>} />
      </Routes>
    </Router>
  );
}