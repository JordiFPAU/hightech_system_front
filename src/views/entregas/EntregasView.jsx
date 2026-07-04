import React, { useEffect, useState, useCallback } from 'react';
import {
    getEntregas,
    createEntrega
} from '../../api/logisticaApi';
import { getUsuarios } from '../../api/authApi';
import EntregasTabla from '../../components/entregas/EntregasTabla';
import RegistrarEntregaModal from '../../components/entregas/RegistrarEntregaModal';
import styles from '../../components/categorias/CategoriasView.module.css';

export default function EntregasView() {
    const [entregas, setEntregas] = useState([]);
    const [repartidoresMap, setRepartidoresMap] = useState({});
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

    const cargarDatos = useCallback(async () => {
        try {
            setCargando(true);
            setError(null);

            const usuariosRes = await getUsuarios();
            const repartidores = usuariosRes.data.filter(u =>
                u.rol?.nombre === 'REPARTIDOR'
            );

            // Construir mapa id → nombre
            const mapa = {};
            repartidores.forEach(r => {
                mapa[r.id] = `${r.nombre} ${r.apellido}`;
            });
            setRepartidoresMap(mapa);

            // Cargar entregas de todos los repartidores
            const todasEntregas = await Promise.all(
                repartidores.map(r => getEntregas(r.id))
            );
            const entregasFlat = todasEntregas.flatMap(res => res.data);
            setEntregas(entregasFlat);

        } catch {
            setError('No se pudieron cargar las entregas.');
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    const manejarRegistrar = async (form) => {
        setGuardando(true);
        setErrorForm(null);
        try {
            await createEntrega(form);
            setModalAbierto(false);
            cargarDatos();
        } catch (err) {
            setErrorForm(err.response?.data?.error || 'Error al registrar la entrega.');
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Entregas</h1>
                    <p className={styles.subtitulo}>
                        {entregas.length} entregas registradas
                    </p>
                </div>
                <button
                    className={styles.botonPrimario}
                    onClick={() => {
                        setErrorForm(null);
                        setModalAbierto(true);
                    }}
                >
                    + Registrar entrega
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {cargando ? (
                <div className={styles.cargando}>Cargando entregas...</div>
            ) : (
                <EntregasTabla
                    entregas={entregas}
                    repartidoresMap={repartidoresMap}
                />
            )}

            <RegistrarEntregaModal
                abierto={modalAbierto}
                onCerrar={() => setModalAbierto(false)}
                onGuardar={manejarRegistrar}
                guardando={guardando}
                errorForm={errorForm}
            />
        </div>
    );
}