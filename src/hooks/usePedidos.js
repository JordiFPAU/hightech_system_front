import { useState, useEffect, useCallback } from 'react';
import { getPedidos } from '../api/logisticaApi';

export function usePedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarPedidos = useCallback(async () => {
        try {
            setCargando(true);
            setError(null);
            const res = await getPedidos();
            setPedidos(res.data);
        } catch {
            setError('No se pudieron cargar los pedidos.');
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarPedidos();
    }, [cargarPedidos]);

    return { pedidos, cargando, error, cargarPedidos };
}