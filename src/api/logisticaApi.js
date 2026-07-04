import { logisticaApi } from './axiosInstance';

export const getClientes = () => logisticaApi.get('/clientes');
export const getClienteById = (id) => logisticaApi.get(`/clientes/${id}`);
export const createCliente = (data) => logisticaApi.post('/clientes', data);
export const updateCliente = (id, data) => logisticaApi.put(`/clientes/${id}`, data);
export const deleteCliente = (id) => logisticaApi.delete(`/clientes/${id}`);

export const getPuntosEntrega = (clienteId) => logisticaApi.get(`/puntos-entrega/cliente/${clienteId}`);
export const createPuntoEntrega = (data) => logisticaApi.post('/puntos-entrega', data);
export const deletePuntoEntrega = (id) => logisticaApi.delete(`/puntos-entrega/${id}`);