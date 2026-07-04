import React, { useState } from 'react';
import { createPedido, actualizarEstadoPedido } from '../../api/logisticaApi';
import { usePedidos } from '../../hooks/usePedidos';
import PedidosTabla from '../../components/pedidos/PedidosTabla';
import CrearPedidoModal from '../../components/pedidos/CrearPedidoModal';
import DetallePedidoModal from '../../components/pedidos/DetallePedidoModal';
import CambiarEstadoModal from '../../components/pedidos/CambiarEstadoModal';
import styles from '../../components/categorias/CategoriasView.module.css';

export default function PedidosView() {
    const { pedidos, cargando, error, cargarPedidos } = usePedidos();

    const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

    const [pedidoDetalle, setPedidoDetalle] = useState(null);
    const [pedidoEstado, setPedidoEstado] = useState(null);
    const [guardandoEstado, setGuardandoEstado] = useState(false);

    const manejarCrear = async (payload) => {
        setGuardando(true);
        setErrorForm(null);
        try {
            await createPedido(payload);
            setModalCrearAbierto(false);
            cargarPedidos();
        } catch (err) {
            setErrorForm(err.response?.data?.error || 'Error al crear el pedido.');
        } finally {
            setGuardando(false);
        }
    };

    const manejarCambiarEstado = async (id, data) => {
        setGuardandoEstado(true);
        try {
            await actualizarEstadoPedido(id, data);
            setPedidoEstado(null);
            cargarPedidos();
        } catch (err) {
            console.error('Error al cambiar estado:', err);
        } finally {
            setGuardandoEstado(false);
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Órdenes de entrega</h1>
                    <p className={styles.subtitulo}>
                        {pedidos.length} órdenes registradas
                    </p>
                </div>
                <button
                    className={styles.botonPrimario}
                    onClick={() => {
                        setErrorForm(null);
                        setModalCrearAbierto(true);
                    }}
                >
                    + Nueva orden
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {cargando ? (
                <div className={styles.cargando}>Cargando pedidos...</div>
            ) : (
                <PedidosTabla
                    pedidos={pedidos}
                    onVerDetalle={setPedidoDetalle}
                    onCambiarEstado={setPedidoEstado}
                />
            )}

            <CrearPedidoModal
                abierto={modalCrearAbierto}
                onCerrar={() => setModalCrearAbierto(false)}
                onGuardar={manejarCrear}
                guardando={guardando}
                errorForm={errorForm}
            />

            <DetallePedidoModal
                abierto={!!pedidoDetalle}
                pedido={pedidoDetalle}
                onCerrar={() => setPedidoDetalle(null)}
            />

            <CambiarEstadoModal
                abierto={!!pedidoEstado}
                pedido={pedidoEstado}
                onCerrar={() => setPedidoEstado(null)}
                onGuardar={manejarCambiarEstado}
                guardando={guardandoEstado}
            />
        </div>
    );
}