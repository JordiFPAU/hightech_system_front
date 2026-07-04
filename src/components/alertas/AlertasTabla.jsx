import React from 'react';
import styles from '../categorias/CategoriasView.module.css';
import alertaStyles from './AlertasTabla.module.css';

export default function AlertasTabla({ alertas }) {
    const getPorcentaje = (stockAlMomento, stockMinimo) => {
        if (!stockMinimo) return 0;
        return Math.min(Math.round((stockAlMomento / stockMinimo) * 100), 100);
    };

    const getColorBarra = (porcentaje) => {
        if (porcentaje <= 30) return alertaStyles.barraRoja;
        if (porcentaje <= 70) return alertaStyles.barraAmarilla;
        return alertaStyles.barraVerde;
    };

    const getBadgeNivel = (porcentaje) => {
        if (porcentaje <= 30) return { clase: alertaStyles.nivelCritico, texto: 'Crítico' };
        if (porcentaje <= 70) return { clase: alertaStyles.nivelBajo, texto: 'Bajo' };
        return { clase: alertaStyles.nivelNormal, texto: 'Normal' };
    };

    return (
        <div className={styles.tablaContenedor}>
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Stock al momento</th>
                        <th>Stock mínimo</th>
                        <th>Nivel</th>
                        <th>Progreso</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {alertas.length === 0 ? (
                        <tr>
                            <td colSpan={6} className={styles.sinDatos}>
                                No hay alertas de stock pendientes
                            </td>
                        </tr>
                    ) : (
                        alertas.map(alerta => {
                            const porcentaje = getPorcentaje(
                                alerta.stockAlMomento,
                                alerta.stockMinimo
                            );
                            const nivel = getBadgeNivel(porcentaje);
                            return (
                                <tr key={alerta.id}>
                                    <td className={styles.nombreCell}>
                                        {alerta.productoNombre}
                                    </td>
                                    <td>
                                        <strong>{alerta.stockAlMomento}</strong> unidades
                                    </td>
                                    <td>{alerta.stockMinimo} unidades</td>
                                    <td>
                                        <span className={`${alertaStyles.badge} ${nivel.clase}`}>
                                            {nivel.texto}
                                        </span>
                                    </td>
                                    <td className={alertaStyles.barraCell}>
                                        <div className={alertaStyles.barraContenedor}>
                                            <div
                                                className={`${alertaStyles.barra} ${getColorBarra(porcentaje)}`}
                                                style={{ width: `${porcentaje}%` }}
                                            />
                                        </div>
                                        <span className={alertaStyles.porcentaje}>
                                            {porcentaje}%
                                        </span>
                                    </td>
                                    <td className={alertaStyles.fecha}>
                                        {new Date(alerta.createdAt).toLocaleDateString('es-EC', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}