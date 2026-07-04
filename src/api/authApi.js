import  { authApi } from './axiosInstance';

export const loginRequest = async (email, password) => {
  
  const response = await authApi.post('/usuarios/login', { email, password });
  return response.data; 
};

export const getUsuarios = () => authApi.get('/usuarios');

export const getRoles = () => authApi.get('/roles');
export const createUsuario = (data) => authApi.post('/usuarios', data);