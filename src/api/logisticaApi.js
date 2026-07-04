import { logisticaApi } from './axiosInstance';

export const getClientes = () => logisticaApi.get('/clientes');
export const getClienteById = (id) => logisticaApi.get(`/clientes/${id}`);
export const createCliente = (data) => logisticaApi.post('/clientes', data);
export const updateCliente = (id, data) => logisticaApi.put(`/clientes/${id}`, data);
export const deleteCliente = (id) => logisticaApi.delete(`/clientes/${id}`);

export const getPuntosEntrega = (clienteId) => logisticaApi.get(`/puntos-entrega/cliente/${clienteId}`);
export const createPuntoEntrega = (data) => logisticaApi.post('/puntos-entrega', data);
export const deletePuntoEntrega = (id) => logisticaApi.delete(`/puntos-entrega/${id}`);

export const getPedidos = () => logisticaApi.get('/pedidos');
export const getPedidoById = (id) => logisticaApi.get(`/pedidos/${id}`);
export const getPedidosPorEstado = (estado) => logisticaApi.get(`/pedidos/estado/${estado}`);
export const createPedido = (data) => logisticaApi.post('/pedidos', data);
export const actualizarEstadoPedido = (id, data) => logisticaApi.put(`/pedidos/${id}/estado`, data);
export const getEntregas = (repartidorId) => logisticaApi.get(`/entregas/repartidor/${repartidorId}`);
export const getEntregaPorPedido = (pedidoId) => logisticaApi.get(`/entregas/pedido/${pedidoId}`);
export const createEntrega = (data) => logisticaApi.post('/entregas', data);