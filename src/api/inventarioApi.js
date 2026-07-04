import { inventarioApi } from './axiosInstance';

export const getCategorias = () => inventarioApi.get('/categorias'); 
export const createCategoria = (data) => inventarioApi.post('/categorias', data);
export const updateCategoria = (id, data) => inventarioApi.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => inventarioApi.delete(`/categorias/${id}`); 

export const getProveedores = () => inventarioApi.get('/proveedores');
export const createProveedor = (data) => inventarioApi.post('/proveedores', data);
export const updateProveedor = (id, data) => inventarioApi.put(`/proveedores/${id}`, data);
export const deleteProveedor = (id) => inventarioApi.delete(`/proveedores/${id}`); 


export const getProductos = () => inventarioApi.get('/productos');
export const getProductoById = (id) => inventarioApi.get(`/productos/${id}`);
export const getProductosStockCritico = () => inventarioApi.get('/productos/stock-critico');
export const createProducto = (data) => inventarioApi.post('/productos', data);
export const updateProducto = (id, data) => inventarioApi.put(`/productos/${id}`, data);
export const deleteProducto = (id) => inventarioApi.delete(`/productos/${id}`);
export const getAlertasNoLeidas = () => inventarioApi.get('/alertas/no-leidas');
export const getAlertasPorProducto = (productoId) => inventarioApi.get(`/alertas/producto/${productoId}`);
