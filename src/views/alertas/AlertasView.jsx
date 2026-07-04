import React, { useEffect, useState } from 'react';
import { getAlertasNoLeidas } from '../../api/inventarioApi';
import AlertasTabla from '../../components/alertas/AlertasTabla';
import styles from '../../components/categorias/CategoriasView.module.css';

export default function AlertasView() {
    const [alertas, setAlertas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarAlertas();
    }, []);

    const cargarAlertas = async () => {
        try {
            setCargando(true);
            const res = await getAlertasNoLeidas();
            setAlertas(res.data);
        } catch {
            setError('No se pudieron cargar las alertas.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Alertas de stock</h1>
                    <p className={styles.subtitulo}>
                        {alertas.length === 0
                            ? 'Sin alertas pendientes'
                            : `${alertas.length} productos con stock bajo`}
                    </p>
                </div>
                <button
                    className={styles.botonSecundario}
                    onClick={cargarAlertas}
                >
                    ↻ Actualizar
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {cargando ? (
                <div className={styles.cargando}>Cargando alertas...</div>
            ) : (
                <AlertasTabla alertas={alertas} />
            )}
        </div>
    );
}