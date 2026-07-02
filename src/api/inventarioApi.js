import { inventarioApi } from './axiosInstance';

export const getCategorias = () => inventarioApi.get('/categorias'); 
export const createCategoria = (data) => inventarioApi.post('/categorias', data);
export const updateCategoria = (id, data) => inventarioApi.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => inventarioApi.delete(`/categorias/${id}`); 

export const getProveedores = () => inventarioApi.get('/proveedores');
export const createProveedor = (data) => inventarioApi.post('/proveedores', data);
export const updateProveedor = (id, data) => inventarioApi.put(`/proveedores/${id}`, data);
export const deleteProveedor = (id) => inventarioApi.delete(`/proveedores/${id}`);