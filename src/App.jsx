import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CustomerDetails } from "./pages/CustomerDetails";
import { CaseDetails } from "./pages/CaseDetails";
import { CustomerList } from "./pages/CustomerList";
import { TemisAI } from "./pages/TemisAI/";
import { CaseList } from "./pages/CaseList/";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="customerdetails" element={
            <ProtectedRoute>
              <CustomerDetails />
            </ProtectedRoute>}
          />
          <Route path="customerlist" element={
            <ProtectedRoute>
              <CustomerList />
            </ProtectedRoute>
          } />
          <Route path="temisai" element={
            <ProtectedRoute>
              <TemisAI />
            </ProtectedRoute>
          } />
          <Route path="caselist" element={
            <ProtectedRoute>
              <CaseList />
            </ProtectedRoute>
          } />
          <Route path="casedetails" element={
            <ProtectedRoute>
              <CaseDetails />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </Router>
  );
}