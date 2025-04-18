import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Layout } from "./components/Layout";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Layout />}>
        </Route>
      </Routes>


    </Router>
  );
}