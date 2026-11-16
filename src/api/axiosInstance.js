import axios from 'axios';

const GATEWAY = process.env.REACT_APP_GATEWAY_URL || 'http://localhost:9090';

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
    instancia.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    return instancia;
};

export const authApi       = crearInstancia(`${GATEWAY}/api/auth`);
export const inventarioApi = crearInstancia(`${GATEWAY}/api/inventario`);
export const logisticaApi  = crearInstancia(`${GATEWAY}/api/logistica`);
export const geoApi        = crearInstancia(`${GATEWAY}/api/geo`);