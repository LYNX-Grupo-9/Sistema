import axios from "axios";
import {API_URL} from "../config/config.js";

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
    updateCustomer: (id,data) => api.patch(`/clientes/${id}`, data),
    getAllCustomer: (idAdvogado) => api.get(`/clientes/listarPorAdvogado/${idAdvogado}`),
    getCustomerById: (id) => api.get(`/clientes/${id}/dados-completo`),
    getOrderByName: (idAdvogado) => api.get("/clientes/ordenado-nome", { params: { idAdvogado } }),
    getOrderByNationality: (idAdvogado) => api.get("/clientes/ordenado-naturalidade", { params: { idAdvogado } }),
    getOrderByBornDate: (idAdvogado) => api.get("/clientes/ordenado-nascimento", { params: { idAdvogado } }),
    getOrderByCases: (idAdvogado) => api.get("/clientes/ordenado-processos", { params: { idAdvogado } }),
    getEventsByCustomerId: (idCliente) => api.get(`/eventos/cliente/${idCliente}`),
    getCustomerBySearch: (searchValue, idAdvogado) => api.get("/clientes/buscar",{
      params: {
        termo: searchValue,
        idAdvogado: idAdvogado
      },
    }),
    getCustomerBySearch: (searchValue, idAdvogado) => api.get("/processos/buscarPorTexto",{
      params: {
        termo: searchValue,
        idAdvogado: idAdvogado
      },
    }),
    
    getAllCases: (idAdvogado) => api.get(`/processos/advogado/${idAdvogado}`),
    newCase: (data) => api.post("/processos", data),
    getCaseById: (id) => api.get(`/processos/${id}`),
    getCasesByCustomerId: (idCliente) => api.get(`/processos/cliente/${idCliente}`),
    editCase: (idProcesso, data) => api.patch(`/processos/${idProcesso}`, data),
    getOrderByNameCustomer: (idAdvogado) => api.get("/processos/processos/ordenado-por-nome-cliente", { params: { idAdvogado } }),
    getOrderByStatus: (idAdvogado) => api.get("/processos/processos/ordenado-por-status", { params: { idAdvogado } }),
    getOrderByValue: (idAdvogado) => api.get("/processos/processos/ordenado-por-valor", { params: { idAdvogado } }),
    getOrderByNumber: (idAdvogado) => api.get("/processos/processos/ordenado-por-numero", { params: { idAdvogado } }),
    
}

export default endpoints

