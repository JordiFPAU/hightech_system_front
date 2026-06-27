import axios from 'axios';

const crearInstancia = (baseURL) => {
    const instancia = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' }
    });

    instancia.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error));

    return instancia;
};

export const authApi     = crearInstancia('http://localhost:8081');
export const inventarioApi = crearInstancia('http://localhost:8082');
export const logisticaApi  = crearInstancia('http://localhost:8083');
export const geoApi        = crearInstancia('http://localhost:8084');