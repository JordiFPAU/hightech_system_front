import { inventarioApi } from './axiosInstance';

export const getCategorias = () => inventarioApi.get('/categorias'); 
export const createCategoria = (data) => inventarioApi.post('/categorias', data);
export const updateCategoria = (id, data) => inventarioApi.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => inventarioApi.delete(`/categorias/${id}`); 