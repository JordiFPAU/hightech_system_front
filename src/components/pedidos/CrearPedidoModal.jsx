import React, { useState, useEffect } from 'react';
import { getClientes, getPuntosEntrega } from '../../api/logisticaApi';
import { getProductos } from '../../api/inventarioApi';
import { calcularTotalPedido } from '../../utils/pedidoUtils';
import styles from '../categorias/CategoriasView.module.css';
import modalStyles from './CrearPedidoModal.module.css';

const ITEM_INICIAL = { productoId: '', cantidad: 1, precioUnitario: '' };

export default function CrearPedidoModal({
    abierto,
    onCerrar,
    onGuardar,
    guardando,
    errorForm
}) {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [puntos, setPuntos] = useState([]);

    const [form, setForm] = useState({
        clienteId: '',
        puntoEntregaId: '',
        numeroFactura: '',
        esUrgente: false,
        observaciones: '',
        items: [{ ...ITEM_INICIAL }]
    });

    useEffect(() => {
        if (abierto) cargarDatos();
    }, [abierto]);

    useEffect(() => {
        if (form.clienteId) cargarPuntos(form.clienteId);
        else setPuntos([]);
    }, [form.clienteId]);

    const cargarDatos = async () => {
        const [clientesRes, productosRes] = await Promise.all([
            getClientes(),
            getProductos()
        ]);
        setClientes(clientesRes.data);
        setProductos(productosRes.data);
    };

    const cargarPuntos = async (clienteId) => {
        const res = await getPuntosEntrega(clienteId);
        setPuntos(res.data);
    };

    const actualizarItem = (index, campo, valor) => {
        const nuevosItems = [...form.items];
        nuevosItems[index] = { ...nuevosItems[index], [campo]: valor };

        // Auto-completar precio cuando se selecciona un producto
        if (campo === 'productoId') {
            const producto = productos.find(p => p.id === valor);
            if (producto) {
                nuevosItems[index].precioUnitario = producto.precioVenta;
            }
        }
        setForm({ ...form, items: nuevosItems });
    };

    const agregarItem = () => {
        setForm({ ...form, items: [...form.items, { ...ITEM_INICIAL }] });
    };

    const eliminarItem = (index) => {
        if (form.items.length === 1) return;
        setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            items: form.items.map(item => ({
                productoId: item.productoId,
                cantidad: Number(item.cantidad),
                precioUnitario: Number(item.precioUnitario)
            }))
        };
        onGuardar(payload);
    };

    const totalEstimado = calcularTotalPedido(
        form.items.map(i => ({
            precioUnitario: i.precioUnitario,
            cantidadSolicitada: i.cantidad
        }))
    );

    if (!abierto) return null;

    return (
        <div className={styles.overlay}>
            <div className={modalStyles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitulo}>Nueva orden de entrega</h2>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                {errorForm && <div className={styles.error}>{errorForm}</div>}

                <form onSubmit={manejarSubmit}>

                    {/* Datos generales */}
                    <div className={modalStyles.seccion}>
                        <p className={modalStyles.seccionTitulo}>Datos generales</p>
                        <div className={modalStyles.grilla}>
                            <div className={styles.campo}>
                                <label className={styles.etiqueta}>Cliente *</label>
                                <select
                                    required
                                    className={styles.input}
                                    value={form.clienteId}
                                    onChange={e => setForm({ ...form, clienteId: e.target.value, puntoEntregaId: '' })}
                                >
                                    <option value="">Selecciona un cliente</option>
                                    {clientes.map(c => (
                                        <option key={c.id} value={c.id}>{c.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.campo}>
                                <label className={styles.etiqueta}>Punto de entrega</label>
                                <select
                                    className={styles.input}
                                    value={form.puntoEntregaId}
                                    onChange={e => setForm({ ...form, puntoEntregaId: e.target.value })}
                                    disabled={!form.clienteId}
                                >
                                    <option value="">Sin punto específico</option>
                                    {puntos.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.descripcion || p.direccionTexto}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.campo}>
                                <label className={styles.etiqueta}>Número de factura</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Ej: FAC-001"
                                    value={form.numeroFactura}
                                    onChange={e => setForm({ ...form, numeroFactura: e.target.value })}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label className={modalStyles.checkLabel}>
                                    <input
                                        type="checkbox"
                                        checked={form.esUrgente}
                                        onChange={e => setForm({ ...form, esUrgente: e.target.checked })}
                                    />
                                    Marcar como urgente
                                </label>
                            </div>
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Observaciones</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Instrucciones especiales de entrega"
                                rows={2}
                                value={form.observaciones}
                                onChange={e => setForm({ ...form, observaciones: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Productos */}
                    <div className={modalStyles.seccion}>
                        <div className={modalStyles.seccionHeader}>
                            <p className={modalStyles.seccionTitulo}>Productos</p>
                            <button
                                type="button"
                                className={styles.botonSecundario}
                                onClick={agregarItem}
                            >
                                + Agregar producto
                            </button>
                        </div>

                        {form.items.map((item, index) => (
                            <div key={index} className={modalStyles.itemRow}>
                                <div className={modalStyles.itemProducto}>
                                    <label className={styles.etiqueta}>Producto *</label>
                                    <select
                                        required
                                        className={styles.input}
                                        value={item.productoId}
                                        onChange={e => actualizarItem(index, 'productoId', e.target.value)}
                                    >
                                        <option value="">Selecciona un producto</option>
                                        {productos.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.nombre} — Stock: {p.stockActual}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={modalStyles.itemCantidad}>
                                    <label className={styles.etiqueta}>Cantidad *</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        className={styles.input}
                                        value={item.cantidad}
                                        onChange={e => actualizarItem(index, 'cantidad', e.target.value)}
                                    />
                                </div>
                                <div className={modalStyles.itemPrecio}>
                                    <label className={styles.etiqueta}>Precio unit.</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className={styles.input}
                                        value={item.precioUnitario}
                                        onChange={e => actualizarItem(index, 'precioUnitario', e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={modalStyles.botonEliminarItem}
                                    onClick={() => eliminarItem(index)}
                                    disabled={form.items.length === 1}
                                    title="Eliminar producto"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {totalEstimado > 0 && (
                            <div className={modalStyles.total}>
                                <span>Total estimado:</span>
                                <strong>${totalEstimado.toFixed(2)}</strong>
                            </div>
                        )}
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
                            {guardando ? 'Creando pedido...' : 'Crear pedido'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}