import axios from "axios";
import { API_URL } from "../config/config.js";
import { patch } from "@mui/material";

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

  // POST 
  newCustomer: (data) => api.post("/advogados/cadastrar/clientes", data),
  newCase: (data) => api.post("/processos", data),
  newCategory: (data) => api.post("/categorias", data),
  newEvent: (data) => api.post("/eventos", data),

  //PATCH
  updateCustomer: (id, data) => api.patch(`/clientes/${id}`, data),
  editCase: (idProcesso, data) => api.patch(`/processos/${idProcesso}`, data),
  patchEvent: (idEvento, data) => api.patch(`/eventos/${idEvento}`, data),

  //UPDATE
  updateCategory: (idCategoria, data) => api.patch(`/categorias/${idCategoria}`, data),

  //GET
  getAllCustomer: (idAdvogado) => api.get(`/clientes/listarPorAdvogado/${idAdvogado}`),
  getCustomerById: (id) => api.get(`/clientes/${id}/dados-completo`),
  getOrderByName: (idAdvogado) => api.get("/clientes/ordenado-nome", { params: { idAdvogado } }),
  getOrderByNationality: (idAdvogado) => api.get("/clientes/ordenado-naturalidade", { params: { idAdvogado } }),
  getOrderByBornDate: (idAdvogado) => api.get("/clientes/ordenado-nascimento", { params: { idAdvogado } }),
  getOrderByCases: (idAdvogado) => api.get("/clientes/ordenado-processos", { params: { idAdvogado } }),
  getEventsByCustomerId: (idCliente) => api.get(`/eventos/cliente/${idCliente}`),
  getCustomerBySearch: (searchValue, idAdvogado) => api.get("/clientes/buscar", {
    params: {
      termo: searchValue,
      idAdvogado: idAdvogado
    },
  }),
  getCaseBySearch: (searchValue, idAdvogado) => api.get("/processos/buscarPorTexto", {
    params: {
      termo: searchValue,
      idAdvogado: idAdvogado
    },
  }),

  getAllCases: (idAdvogado) => api.get(`/processos/advogado/${idAdvogado}`),
  getCaseById: (id) => api.get(`/processos/${id}`),
  getCasesByCustomerId: (idCliente) => api.get(`/processos/cliente/${idCliente}`),
  getOrderByNameCustomer: (idAdvogado) => api.get("/processos/processos/ordenado-por-nome-cliente", { params: { idAdvogado } }),
  getOrderByStatus: (idAdvogado) => api.get("/processos/processos/ordenado-por-status", { params: { idAdvogado } }),
  getOrderByValue: (idAdvogado) => api.get("/processos/processos/ordenado-por-valor", { params: { idAdvogado } }),
  getOrderByNumber: (idAdvogado) => api.get("/processos/processos/ordenado-por-numero", { params: { idAdvogado } }),
  getCategorias: (idAdvogado) => api.get(`/categorias/advogado/${idAdvogado}`),
  getCategoriaById: (idCategoria) => api.get(`/categorias/${idCategoria}`),
  getEvents: (idAdvogado) => api.get(`/eventos/advogado/${idAdvogado}`),
  getEventById: (idEvento) => api.get(`/eventos/${idEvento}`),
  getEventsNext7days: (idAdvogado) => api.get(`/eventos/advogado/${idAdvogado}/7dias`),
  getClientsByIdAdvogado: (idAdvogado) => api.get(`/clientes/listarPorAdvogado/${idAdvogado}`),
  getProcessosByIdCliente: (idCliente) => api.get(`/processos/cliente/${idCliente}`),

  // DELETE 
  deleteCategoria: (idCategoria) => api.delete(`/categorias/${idCategoria}`),
  deleteEvento: (idEvento) => api.delete(`/eventos/${idEvento}`)
}

export default endpoints

