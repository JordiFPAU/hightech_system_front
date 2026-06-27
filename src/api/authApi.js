import axiosInstance, { authApi } from './axiosInstance';

export const loginRequest = async (email, password) => {
  
  const response = await authApi.post('/usuarios/login', { email, password });
  return response.data; 
};