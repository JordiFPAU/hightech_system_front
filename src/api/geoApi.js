import { geoApi } from './axiosInstance';

export const getUbicacionActual = (repartidorId) =>
    geoApi.get(`/coordenadas/ubicacion-actual/${repartidorId}`);

export const getRutasActivas = () =>
    geoApi.get('/rutas/activas');

export const getHistorialCoordenadas = (repartidorId) =>
    geoApi.get(`/coordenadas/historial/${repartidorId}`);