import axios from "axios";
import {API_URL } from "../config/config.js";
import {API_TOKEN } from "../config/config.js";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

const endpoints = {
    newCustomer: (data) => api.post("/advogados/cadastrar/clientes", data),
    getAllCustomer: () => api.get("/clientes"),
    
}

export default endpoints

