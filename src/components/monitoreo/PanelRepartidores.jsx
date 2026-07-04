import React from 'react';
import styles from './PanelRepartidores.module.css';

export default function PanelRepartidores({
    repartidores,
    ubicaciones,
    ultimaActualizacion
}) {
    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <p className={styles.titulo}>Repartidores</p>
                {ultimaActualizacion && (
                    <p className={styles.actualizacion}>
                        Actualizado: {ultimaActualizacion.toLocaleTimeString('es-EC')}
                    </p>
                )}
            </div>

            <div className={styles.lista}>
                {repartidores.length === 0 ? (
                    <p className={styles.sinDatos}>No hay repartidores registrados</p>
                ) : (
                    repartidores.map(rep => {
                        const ubicacion = ubicaciones[rep.id];
                        const enLinea = !!ubicacion;
                        return (
                            <div key={rep.id} className={styles.item}>
                                <div className={styles.avatar}>
                                    {rep.nombre[0]}{rep.apellido[0]}
                                </div>
                                <div className={styles.info}>
                                    <p className={styles.nombre}>
                                        {rep.nombre} {rep.apellido}
                                    </p>
                                    <p className={styles.estado}>
                                        {enLinea
                                            ? `${ubicacion.latitud?.toFixed(4)}, ${ubicacion.longitud?.toFixed(4)}`
                                            : 'Sin ubicación registrada'}
                                    </p>
                                </div>
                                <div
                                    className={`${styles.indicador} ${enLinea
                                        ? styles.indicadorActivo
                                        : styles.indicadorInactivo}`}
                                    title={enLinea ? 'Con ubicación' : 'Sin ubicación'}
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}