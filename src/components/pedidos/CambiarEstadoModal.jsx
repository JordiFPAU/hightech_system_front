import React, { useState } from 'react';
import { ESTADOS_PEDIDO, getBadgeEstilo } from '../../utils/pedidoUtils';
import styles from '../categorias/CategoriasView.module.css';
import estadoStyles from './CambiarEstadoModal.module.css';

export default function CambiarEstadoModal({
    abierto,
    pedido,
    onCerrar,
    onGuardar,
    guardando
}) {
    const [nuevoEstado, setNuevoEstado] = useState('');

    if (!abierto || !pedido) return null;

    const manejarGuardar = (e) => {
        e.preventDefault();
        if (!nuevoEstado) return;
        onGuardar(pedido.id, { estado: nuevoEstado });
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalPequeno}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitulo}>Cambiar estado</h2>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                <p className={estadoStyles.pedidoInfo}>
                    Pedido: <strong>{pedido.numeroFactura || 'Sin factura'}</strong>
                    {' — '}{pedido.cliente?.nombre}
                </p>

                <p className={estadoStyles.estadoActual}>
                    Estado actual:{' '}
                    <span
                        className={estadoStyles.badge}
                        style={{
                            backgroundColor: getBadgeEstilo(pedido.estado).bg,
                            color: getBadgeEstilo(pedido.estado).color
                        }}
                    >
                        {pedido.estado}
                    </span>
                </p>

                <form onSubmit={manejarGuardar}>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Nuevo estado *</label>
                        <div className={estadoStyles.opcionesEstado}>
                            {ESTADOS_PEDIDO.filter(e => e !== pedido.estado).map(estado => {
                                const estilo = getBadgeEstilo(estado);
                                return (
                                    <label
                                        key={estado}
                                        className={`${estadoStyles.opcion} ${nuevoEstado === estado ? estadoStyles.opcionSeleccionada : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="estado"
                                            value={estado}
                                            checked={nuevoEstado === estado}
                                            onChange={() => setNuevoEstado(estado)}
                                        />
                                        <span
                                            className={estadoStyles.badge}
                                            style={{
                                                backgroundColor: estilo.bg,
                                                color: estilo.color
                                            }}
                                        >
                                            {estado}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            className={styles.botonSecundario}
                            onClick={onCerrar}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.botonPrimario}
                            disabled={guardando || !nuevoEstado}
                        >
                            {guardando ? 'Guardando...' : 'Actualizar estado'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}