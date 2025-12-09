import axios from "axios";
// import { API_URL } from "../config/config.js";
import { API_URL } from "./configuracao.js";


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

const apiGrafico = axios.create({
  baseURL: API_URL.replace("/api", "/"),
  headers: {
    "Content-Type": "application/json",
  },
});

apiGrafico.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


const endpoints = {

  // POST 
  newCustomer: (data) => api.post("/clientes/cadastrar", data),
  newCase: (data) => api.post("/processos", data),
  newCategory: (data) => api.post("/categorias", data),
  newEvent: (data) => api.post("/eventos", data),
  newAnexo: (payload) => api.post("/anexos", payload),
  clearCacheProcessos: () => api.post("/processos/cache/limpar-tudo"),
  clearCacheClientes: () => api.post("/clientes/cache/limpar-tudo"),

  //PATCH
  updateCustomer: (id, data) => api.patch(`/clientes/${id}`, data),
  editCase: (idProcesso, data) => api.patch(`/processos/${idProcesso}`, data),
  patchEvent: (idEvento, data) => api.patch(`/eventos/${idEvento}`, data),

  //UPDATE
  updateCategory: (idCategoria, data) => api.patch(`/categorias/${idCategoria}`, data),
  changeStatusSolicitacao: (idSolicitacao) => api.put(`/solicitacao-agendamento/visualizar/${idSolicitacao}`),

  //GET
  getCustomerPagination: (page, size) => api.get(`/clientes/paginado?page=${page}&size=${size}`),
  getCasePagination: (page, size) => api.get(`/processos/paginado?page=${page}&size=${size}`),
  getAllCustomer: (idAdvogado) => api.get(`/clientes/listarPorAdvogado/${idAdvogado}`),
  getCustomerById: (id) => api.get(`/clientes/${id}/dados-completos`),
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
  getCaseBySearch: (searchValue, idAdvogado) => api.get("/processos/buscar", {
    params: {
      termo: searchValue,
      idAdvogado: idAdvogado
    },
  }),
  getLancamentoByIdAdvogado: (idAdvogado) => api.get(`/lancamentos/advogado/${idAdvogado}`),

  // PARCELAS
createParcela: (payload) => api.post("/parcelas", payload),

// LANCAMENTOS
createLancamento: (payload) => api.post("/lancamentos", payload),


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
  getAnexosDoCliente: (idCliente) => api.get(`/anexos/cliente/${idCliente}`),
  getAnexosDoProcesso: (idProcesso) => api.get(`/anexos/processo/${idProcesso}`),
  getSolicitacaoById: (idSolicitacao) => api.get(`/solicitacao-agendamento/solicitacao/${idSolicitacao}`),
  getNextEventByIdAdv: (idAdvogado) => api.get(`/eventos/proximo/${idAdvogado}`),
  getQtdEventosDia: (idAdvogado) => api.get(`/eventos/contar-eventos-dia/${idAdvogado}`),
  getProcessosPorTipoDeAcao: (idAdvogado) => api.get(`/processos/quantidade-por-classe/${idAdvogado}`),
  getSolicitacoeByAdvId: (idAdvogado) => api.get(`/solicitacao-agendamento/advogado/${idAdvogado}`),
  getQtdEventosPorCategoriaByIdAdv: (idAdvogado) => api.get(`/categorias/contagem-por-nome/${idAdvogado}`),
  getValorMedioProcessos: (idAdvogado) => api.get(`/processos/media-valor/${idAdvogado}`),
  getContagemPorStatus: (idAdvogado) => api.get(`/processos/contagem-por-status/${idAdvogado}`),
  getEventosProx7dias: (idAdvogado) => api.get(`/eventos/advogado/${idAdvogado}/7dias`),
  getTotalProcessosAtivos: (idAdvogado) => api.get(`/processos/processosAtivos/${idAdvogado}`),
  getTotalEventosMes: (idAdvogado) => api.get(`/eventos/advogado/${idAdvogado}/eventosMes`),
  getTotalClietesAtivos: (idAdvogado) => api.get(`/clientes/advogado/${idAdvogado}/total-clientes`),

  // grafico-controller
getPendingLast6MonthsChart: () =>
  apiGrafico.get('/grafico/grafico/pendente-ultimos-6-meses'),

getInvoicedLast6MonthsChart: () =>
  apiGrafico.get('/grafico/grafico/faturado-ultimos-6-meses'),

// financeiro-controller
getTotalPending: () =>
  apiGrafico.get('/financeiro/total-pendente'),

getTotalInvoicedMonth: () =>
  apiGrafico.get('/financeiro/total-faturado-mes'),

getTotalReceivable: () =>
  apiGrafico.get('/financeiro/total-a-receber'),

getNextPayment: () =>
  apiGrafico.get('/financeiro/proximo-pagamento'),

getProcessesWithPendings: () =>
  apiGrafico.get('/financeiro/processos-com-pendencias'),

getRevenueLast6Months: () =>
  apiGrafico.get('/financeiro/faturamento-6-meses'),

getClientsWithPendings: () =>
  apiGrafico.get('/financeiro/clientes-com-pendencias'),


  // DELETE 
  deleteCategoria: (idCategoria) => api.delete(`/categorias/${idCategoria}`),
  deleteEvento: (idEvento) => api.delete(`/eventos/${idEvento}`),
  deleteAnexo: (idAnexo) => api.delete(`/anexos/${idAnexo}`),
}

export default endpoints