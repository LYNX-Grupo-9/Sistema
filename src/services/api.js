import axios from "axios";
import {API_URL } from "../config/config.js";

const apiToken = localStorage.getItem("token");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
  },
});

const endpoints = {
    newCustomer: (data) => api.post("/advogados/cadastrar/clientes", data),
    getAllCustomer: () => api.get("/clientes/listar"),
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

