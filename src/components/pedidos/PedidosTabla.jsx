import React from 'react';
import { getBadgeEstilo, formatearFecha } from '../../utils/pedidoUtils';
import styles from '../categorias/CategoriasView.module.css';
import pedidoStyles from './PedidosTabla.module.css';

export default function PedidosTabla({ pedidos, onVerDetalle, onCambiarEstado }) {
    return (
        <div className={styles.tablaContenedor}>
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Factura</th>
                        <th>Cliente</th>
                        <th>Productos</th>
                        <th>Urgente</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.length === 0 ? (
                        <tr>
                            <td colSpan={7} className={styles.sinDatos}>
                                No hay pedidos registrados
                            </td>
                        </tr>
                    ) : (
                        pedidos.map(pedido => {
                            const badgeEstilo = getBadgeEstilo(pedido.estado);
                            return (
                                <tr key={pedido.id}>
                                    <td className={styles.nombreCell}>
                                        {pedido.numeroFactura || '—'}
                                    </td>
                                    <td>{pedido.cliente?.nombre || '—'}</td>
                                    <td>{pedido.detalles?.length || 0} productos</td>
                                    <td>
                                        {pedido.esUrgente ? (
                                            <span className={pedidoStyles.badgeUrgente}>
                                                Urgente
                                            </span>
                                        ) : '—'}
                                    </td>
                                    <td>
                                        <span
                                            className={pedidoStyles.badge}
                                            style={{
                                                backgroundColor: badgeEstilo.bg,
                                                color: badgeEstilo.color
                                            }}
                                        >
                                            {pedido.estado}
                                        </span>
                                    </td>
                                    <td className={pedidoStyles.fecha}>
                                        {formatearFecha(pedido.createdAt)}
                                    </td>
                                    <td>
                                        <div className={styles.acciones}>
                                            <button
                                                className={styles.botonEditar}
                                                onClick={() => onVerDetalle(pedido)}
                                            >
                                                Ver detalle
                                            </button>
                                            <button
                                                className={styles.botonEditar}
                                                onClick={() => onCambiarEstado(pedido)}
                                            >
                                                Estado
                                            </button>
                                        </div>
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