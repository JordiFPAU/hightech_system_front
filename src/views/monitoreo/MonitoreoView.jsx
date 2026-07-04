import React from 'react';
import { useMonitoreo } from '../../hooks/useMonitoreo';
import MapaMonitoreo from '../../components/monitoreo/MapaMonitoreo';
import PanelRepartidores from '../../components/monitoreo/PanelRepartidores';
import styles from './MonitoreoView.module.css';

export default function MonitoreoView() {
    const { repartidores, ubicaciones, cargando, ultimaActualizacion } = useMonitoreo();

    const totalActivos = Object.keys(ubicaciones).length;

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Mapa en tiempo real</h1>
                    <p className={styles.subtitulo}>
                        {cargando
                            ? 'Cargando ubicaciones...'
                            : `${totalActivos} de ${repartidores.length} repartidores con ubicación — actualización cada 15 segundos`}
                    </p>
                </div>
            </div>

            {cargando ? (
                <div className={styles.cargando}>Cargando mapa...</div>
            ) : (
                <div className={styles.layout}>
                    <div className={styles.mapaContenedor}>
                        <MapaMonitoreo
                            repartidores={repartidores}
                            ubicaciones={ubicaciones}
                        />
                    </div>
                    <div className={styles.panelContenedor}>
                        <PanelRepartidores
                            repartidores={repartidores}
                            ubicaciones={ubicaciones}
                            ultimaActualizacion={ultimaActualizacion}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}