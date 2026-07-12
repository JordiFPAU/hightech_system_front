import React, { useEffect, useState } from 'react';
import { getBadgeEstilo, formatearFecha, calcularTotalPedido } from '../../utils/pedidoUtils';
import styles from '../categorias/CategoriasView.module.css';
import detalleStyles from './DetallePedidoModal.module.css';
import { getProductos } from '../../api/inventarioApi';

export default function DetallePedidoModal({ abierto, pedido, onCerrar }) {
    const [productosMap, setProductosMap] = useState({});

    useEffect(() => {
        if (abierto) {
            getProductos().then(res => {
                const mapa = {};
                res.data.forEach(p => { mapa[p.id] = p.nombre; });
                setProductosMap(mapa);
            });
        }
    }, [abierto]);


    if (!abierto || !pedido) return null;

    const badgeEstilo = getBadgeEstilo(pedido.estado);
    const total = calcularTotalPedido(pedido.detalles);

    return (
        <div className={styles.overlay}>
            <div className={detalleStyles.modal}>
                <div className={styles.modalHeader}>
                    <div>
                        <h2 className={styles.modalTitulo}>
                            Detalle del pedido
                        </h2>
                        <p className={detalleStyles.factura}>
                            {pedido.numeroFactura || 'Sin número de factura'}
                        </p>
                    </div>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                {/* Info general */}
                <div className={detalleStyles.infoGrid}>
                    <div className={detalleStyles.infoItem}>
                        <span className={detalleStyles.infoLabel}>Cliente</span>
                        <span className={detalleStyles.infoValor}>
                            {pedido.cliente?.nombre}
                        </span>
                    </div>
                    <div className={detalleStyles.infoItem}>
                        <span className={detalleStyles.infoLabel}>Estado</span>
                        <span
                            className={detalleStyles.badge}
                            style={{
                                backgroundColor: badgeEstilo.bg,
                                color: badgeEstilo.color
                            }}
                        >
                            {pedido.estado}
                        </span>
                    </div>
                    <div className={detalleStyles.infoItem}>
                        <span className={detalleStyles.infoLabel}>Punto de entrega</span>
                        <span className={detalleStyles.infoValor}>
                            {pedido.puntoEntrega?.direccionTexto || '—'}
                        </span>
                    </div>
                    <div className={detalleStyles.infoItem}>
                        <span className={detalleStyles.infoLabel}>Fecha</span>
                        <span className={detalleStyles.infoValor}>
                            {formatearFecha(pedido.createdAt)}
                        </span>
                    </div>
                    {pedido.esUrgente && (
                        <div className={detalleStyles.infoItem}>
                            <span className={detalleStyles.urgente}>Entrega urgente</span>
                        </div>
                    )}
                    {pedido.observaciones && (
                        <div className={`${detalleStyles.infoItem} ${detalleStyles.infoCompleto}`}>
                            <span className={detalleStyles.infoLabel}>Observaciones</span>
                            <span className={detalleStyles.infoValor}>
                                {pedido.observaciones}
                            </span>
                        </div>
                    )}
                </div>

                {/* Productos */}
                <p className={detalleStyles.seccionTitulo}>Productos del pedido</p>
                <div className={detalleStyles.tablaContenedor}>
                    <table className={styles.tabla}>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Solicitado</th>
                                <th>Entregado</th>
                                <th>Precio unit.</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedido.detalles?.map(detalle => (
                                <tr key={detalle.id}>
                                    <td className={styles.nombreCell}>
                                         {productosMap[detalle.productoId] || detalle.productoId}
                                    </td>
                                    <td>{detalle.cantidadSolicitada}</td>
                                    <td>{detalle.cantidadEntregada}</td>
                                    <td>${Number(detalle.precioUnitario).toFixed(2)}</td>
                                    <td>
                                        ${(Number(detalle.precioUnitario) * detalle.cantidadSolicitada).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {total > 0 && (
                    <div className={detalleStyles.total}>
                        <span>Total:</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                )}

                <div className={styles.modalFooter}>
                    <button className={styles.botonSecundario} onClick={onCerrar}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}