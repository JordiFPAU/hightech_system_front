import axiosInstance from './axiosInstance';

export const loginRequest = async (email, password) => {
  
  const response = await axiosInstance.post('/usuarios/login', { email, password });
  return response.data; 
};