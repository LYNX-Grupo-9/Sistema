
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
import Agenda from "./pages/Agenda";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";


export default function App() {


  return (
    <Router>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/login" element={<Login />} />
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

          <Route path="agenda" element={
            <ProtectedRoute>
              <Agenda />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </Router>
  );
}