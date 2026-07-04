import React, { useState, useEffect } from 'react';
import { getPedidos } from '../../api/logisticaApi';
import { getUsuarios } from '../../api/authApi';
import styles from '../categorias/CategoriasView.module.css';
import entregaStyles from './RegistrarEntregaModal.module.css';
import { ESTADOS_ENTREGA, METODOS_PAGO } from '../../utils/pedidoUtils';

const FORM_INICIAL = {
    pedidoId: '',
    repartidorId: '',
    metodoPago: '',
    observaciones: '',
    estado: 'COMPLETA'
};


export default function RegistrarEntregaModal({
    abierto,
    onCerrar,
    onGuardar,
    guardando,
    errorForm
}) {
    const [form, setForm] = useState(FORM_INICIAL);
    const [pedidos, setPedidos] = useState([]);
    const [repartidores, setRepartidores] = useState([]);

    useEffect(() => {
        if (abierto) cargarDatos();
    }, [abierto]);

    const cargarDatos = async () => {
        try {
            const [pedidosRes, usuariosRes] = await Promise.all([
                getPedidos(),
                getUsuarios()
            ]);
            // Solo pedidos en ruta o pendientes
            setPedidos(pedidosRes.data.filter(p =>
                ['PENDIENTE', 'EN_RUTA'].includes(p.estado)
            ));
            // Solo repartidores
            setRepartidores(usuariosRes.data.filter(u =>
                u.rol?.nombre === 'REPARTIDOR'
            ));
        } catch (err) {
            console.error('Error cargando datos:', err);
        }
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        onGuardar(form);
    };

    if (!abierto) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitulo}>Registrar entrega</h2>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                {errorForm && <div className={styles.error}>{errorForm}</div>}

                <form onSubmit={manejarSubmit}>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Pedido *</label>
                        <select
                            required
                            className={styles.input}
                            value={form.pedidoId}
                            onChange={e => setForm({ ...form, pedidoId: e.target.value })}
                        >
                            <option value="">Selecciona un pedido</option>
                            {pedidos.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.numeroFactura || 'Sin factura'} — {p.cliente?.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Repartidor *</label>
                        <select
                            required
                            className={styles.input}
                            value={form.repartidorId}
                            onChange={e => setForm({ ...form, repartidorId: e.target.value })}
                        >
                            <option value="">Selecciona un repartidor</option>
                            {repartidores.map(r => (
                                <option key={r.id} value={r.id}>
                                    {r.nombre} {r.apellido}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Estado de entrega *</label>
                        <div className={entregaStyles.opcionesEstado}>
                            {ESTADOS_ENTREGA.map(estado => (
                                <label
                                    key={estado}
                                    className={`${entregaStyles.opcion} ${form.estado === estado ? entregaStyles.opcionSeleccionada : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="estadoEntrega"
                                        value={estado}
                                        checked={form.estado === estado}
                                        onChange={() => setForm({ ...form, estado })}
                                    />
                                    {estado}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Método de pago</label>
                        <select
                            className={styles.input}
                            value={form.metodoPago}
                            onChange={e => setForm({ ...form, metodoPago: e.target.value })}
                        >
                            <option value="">Sin especificar</option>
                            {METODOS_PAGO.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Observaciones</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Novedades de la entrega"
                            rows={2}
                            value={form.observaciones}
                            onChange={e => setForm({ ...form, observaciones: e.target.value })}
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
                            {guardando ? 'Registrando...' : 'Registrar entrega'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}