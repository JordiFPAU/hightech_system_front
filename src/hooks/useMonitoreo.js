import { useState, useEffect, useCallback, useRef } from 'react';
import { getUsuarios } from '../api/authApi';
import { getUbicacionActual } from '../api/geoApi';

const INTERVALO_ACTUALIZACION = 15000; // 15 segundos

export function useMonitoreo() {
    const [repartidores, setRepartidores] = useState([]);
    const [ubicaciones, setUbicaciones] = useState({});
    const [cargando, setCargando] = useState(true);
    const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
    const intervaloRef = useRef(null);

    const cargarRepartidores = useCallback(async () => {
        try {
            const res = await getUsuarios();
            const reps = res.data.filter(u => u.rol?.nombre === 'REPARTIDOR' && u.activo);
            setRepartidores(reps);
            return reps;
        } catch (err) {
            console.error('Error cargando repartidores:', err);
            return [];
        }
    }, []);

    const actualizarUbicaciones = useCallback(async (reps) => {
        const resultados = await Promise.allSettled(
            reps.map(r => getUbicacionActual(r.id))
        );

        const nuevasUbicaciones = {};
        resultados.forEach((resultado, index) => {
            if (resultado.status === 'fulfilled') {
                nuevasUbicaciones[reps[index].id] = resultado.value.data;
            }
        });

        setUbicaciones(nuevasUbicaciones);
        setUltimaActualizacion(new Date());
        setCargando(false);
    }, []);

    useEffect(() => {
        const iniciar = async () => {
            const reps = await cargarRepartidores();
            await actualizarUbicaciones(reps);

            intervaloRef.current = setInterval(async () => {
                await actualizarUbicaciones(reps);
            }, INTERVALO_ACTUALIZACION);
        };

        iniciar();

        return () => {
            if (intervaloRef.current) clearInterval(intervaloRef.current);
        };
    }, [cargarRepartidores, actualizarUbicaciones]);

    return { repartidores, ubicaciones, cargando, ultimaActualizacion };
}