import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Home } from "./pages/Home";
import { ClientDetails } from "./pages/ClientDetails";
import { ClientList } from "./pages/ClientList";


export default function App() {
  return (
      <Router>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/ClientDetails" element={<ClientDetails/>} />
        <Route path="/ClientList" element={<ClientList/>} />
      </Routes>
    </Router>
  );
}