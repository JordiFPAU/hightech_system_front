import React from 'react';
import { formatearFecha,BADGE_ESTADO_ENTREGA } from '../../utils/pedidoUtils';
import styles from '../categorias/CategoriasView.module.css';
import entregaStyles from './EntregasTabla.module.css';



export default function EntregasTabla({ entregas, repartidoresMap }) {
    
    return (
        <div className={styles.tablaContenedor}>
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Repartidor</th>
                        <th>Estado</th>
                        <th>Método de pago</th>
                        <th>Observaciones</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {entregas.length === 0 ? (
                        <tr>
                            <td colSpan={6} className={styles.sinDatos}>
                                No hay entregas registradas
                            </td>
                        </tr>
                    ) : (
                        entregas.map(entrega => {
                            const badgeEstilo = BADGE_ESTADO_ENTREGA[entrega.estado]
                                || BADGE_ESTADO_ENTREGA.COMPLETA;
                            return (
                                <tr key={entrega.id}>
                                    <td className={styles.nombreCell}>
                                        {entrega.pedidoId?.substring(0, 8)}...
                                    </td>
                                    <td>
                                        {repartidoresMap[entrega.repartidorId] || '—'}
                                    </td>
                                    <td>
                                        <span
                                            className={entregaStyles.badge}
                                            style={{
                                                backgroundColor: badgeEstilo.bg,
                                                color: badgeEstilo.color
                                            }}
                                        >
                                            {entrega.estado}
                                        </span>
                                    </td>
                                    <td>{entrega.metodoPago || '—'}</td>
                                    <td className={entregaStyles.observaciones}>
                                        {entrega.observaciones || '—'}
                                    </td>
                                    <td className={entregaStyles.fecha}>
                                        {formatearFecha(entrega.timestampEntrega)}
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