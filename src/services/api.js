import axios from "axios";
import {API_URL } from "../config/config.js";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const endpoints = {
    newCustomer: (data) => api.post("/advogados/cadastrar/clientes", data),
    getAllCustomer: (idAdvogado) => api.get(`/clientes/listarPorAdvogado/${idAdvogado}`),
    getCustomerById: (id) => api.get(`/clientes/${id}/dados-completo`),
    getOrderByName: () => api.get("/clientes/ordenado-nome"),
    getOrderByNationality: () => api.get("/clientes/ordenado-naturalidade"),
    getOrderByBornDate: () => api.get("/clientes/ordenado-nascimento"),
    getOrderByCases: () => api.get("/clientes/ordenado-processos"),
    
    getCustomerBySearch: (searchValue) => api.get("/clientes/buscar",{
        params: {
            termo: searchValue,
        },
    }),
}

export default endpoints

