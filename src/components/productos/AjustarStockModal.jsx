import React, { useState } from 'react';
import { inventarioApi } from '../../api/axiosInstance';
import styles from '../categorias/CategoriasView.module.css';
import modalStyles from './AjustarStockModal.module.css';

export default function AjustarStockModal({ abierto, producto, onCerrar, onExito }) {
    const [form, setForm] = useState({ tipo: 'ENTRADA', cantidad: '', observacion: '' });
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);

    if (!abierto || !producto) return null;

    const manejarAjuste = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setError(null);

        try {
            await inventarioApi.post('/stock/ajustar', {
                productoId: producto.id,
                tipo: form.tipo,
                cantidad: Number(form.cantidad),
                observacion: form.observacion || null
            });
            setForm({ tipo: 'ENTRADA', cantidad: '', observacion: '' });
            onExito();
            onCerrar();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al ajustar el stock.');
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitulo}>Ajustar stock</h2>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                <div className={modalStyles.infoProducto}>
                    <p className={modalStyles.nombreProducto}>{producto.nombre}</p>
                    <p className={modalStyles.stockActual}>
                        Stock actual: <strong>{producto.stockActual}</strong> unidades
                        — Mínimo: <strong>{producto.stockMinimo}</strong>
                    </p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={manejarAjuste}>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Tipo de movimiento *</label>
                        <select
                            required
                            className={styles.input}
                            value={form.tipo}
                            onChange={e => setForm({ ...form, tipo: e.target.value })}
                        >
                            <option value="ENTRADA">Entrada — ingreso a bodega</option>
                            <option value="SALIDA">Salida — despacho</option>
                        </select>
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Cantidad *</label>
                        <input
                            type="number"
                            required
                            min="1"
                            className={styles.input}
                            placeholder="Ej: 20"
                            value={form.cantidad}
                            onChange={e => setForm({ ...form, cantidad: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Observación</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Motivo del ajuste (opcional)"
                            rows={2}
                            value={form.observacion}
                            onChange={e => setForm({ ...form, observacion: e.target.value })}
                        />
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
                            disabled={guardando}
                        >
                            {guardando ? 'Ajustando...' : 'Confirmar ajuste'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}