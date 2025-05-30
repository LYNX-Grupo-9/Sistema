
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CustomerDetails } from "./pages/CustomerDetails";
import { CustomerList } from "./pages/CustomerList";
import Agenda from "./pages/Agenda";
import { TemisAI } from "./pages/TemisAI/TemisAI";
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