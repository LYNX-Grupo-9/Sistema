import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CustomerDetails } from "./pages/CustomerDetails";
import { CustomerList } from "./pages/CustomerList";
import Calendar from "./pages/Calendar";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* <Route path="/home" element={<Home/>} />
        <Route path="/CustomerDetails" element={<CustomerDetails/>} />
        <Route path="/CustomerList" element={</>} /> */}
        <Route path="/login" index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="customerdetails" element={<CustomerDetails />} />
          <Route path="customerlist" element={<CustomerList />} />
          <Route path="agenda" element={<Calendar />} />
        </Route>
      </Routes>


    </Router>
  );
}