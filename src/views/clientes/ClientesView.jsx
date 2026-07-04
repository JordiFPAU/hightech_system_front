import React, { useEffect, useState } from 'react';
import {
    getClientes,
    createCliente,
    updateCliente,
    deleteCliente
} from '../../api/logisticaApi';
import ClientesTabla from '../../components/clientes/ClientesTabla';
import ClienteModalForm from '../../components/clientes/ClienteModalForm';
import PuntosEntregaModal from '../../components/clientes/PuntosEntregaModal';
import ConfirmarEliminarModal from '../../components/categorias/ConfirmarEliminarModal';
import styles from '../../components/categorias/CategoriasView.module.css';

const FORM_INICIAL = {
    nombre: '',
    rucCi: '',
    telefono: '',
    correo: '',
    direccion: ''
};

export default function ClientesView() {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [clienteEditando, setClienteEditando] = useState(null);
    const [form, setForm] = useState(FORM_INICIAL);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

    const [confirmando, setConfirmando] = useState(false);
    const [clienteAEliminar, setClienteAEliminar] = useState(null);

    const [modalPuntosAbierto, setModalPuntosAbierto] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        try {
            setCargando(true);
            const res = await getClientes();
            setClientes(res.data);
        } catch {
            setError('No se pudieron cargar los clientes.');
        } finally {
            setCargando(false);
        }
    };

    const abrirCrear = () => {
        setClienteEditando(null);
        setForm(FORM_INICIAL);
        setErrorForm(null);
        setModalAbierto(true);
    };

    const abrirEditar = (cliente) => {
        setClienteEditando(cliente);
        setForm({
            nombre: cliente.nombre,
            rucCi: cliente.rucCi || '',
            telefono: cliente.telefono || '',
            correo: cliente.correo || '',
            direccion: cliente.direccion || ''
        });
        setErrorForm(null);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setClienteEditando(null);
        setErrorForm(null);
    };

    const manejarGuardar = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setErrorForm(null);

        try {
            if (clienteEditando) {
                await updateCliente(clienteEditando.id, form);
            } else {
                await createCliente(form);
            }
            cerrarModal();
            cargarClientes();
        } catch (err) {
            setErrorForm(err.response?.data?.error || 'Error al guardar el cliente.');
        } finally {
            setGuardando(false);
        }
    };

    const pedirConfirmacion = (cliente) => {
        setClienteAEliminar(cliente);
        setConfirmando(true);
    };

    const confirmarEliminar = async () => {
        try {
            await deleteCliente(clienteAEliminar.id);
            setConfirmando(false);
            setClienteAEliminar(null);
            cargarClientes();
        } catch {
            setError('No se pudo eliminar el cliente.');
        }
    };

    const abrirPuntos = (cliente) => {
        setClienteSeleccionado(cliente);
        setModalPuntosAbierto(true);
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Clientes</h1>
                    <p className={styles.subtitulo}>
                        {clientes.length} clientes registrados
                    </p>
                </div>
                <button className={styles.botonPrimario} onClick={abrirCrear}>
                    + Nuevo cliente
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {cargando ? (
                <div className={styles.cargando}>Cargando clientes...</div>
            ) : (
                <ClientesTabla
                    clientes={clientes}
                    onEditar={abrirEditar}
                    onEliminar={pedirConfirmacion}
                    onVerPuntos={abrirPuntos}
                />
            )}

            <ClienteModalForm
                abierto={modalAbierto}
                clienteEditando={clienteEditando}
                form={form}
                onChange={setForm}
                onGuardar={manejarGuardar}
                onCerrar={cerrarModal}
                guardando={guardando}
                errorForm={errorForm}
            />

            <PuntosEntregaModal
                abierto={modalPuntosAbierto}
                cliente={clienteSeleccionado}
                onCerrar={() => setModalPuntosAbierto(false)}
            />

            <ConfirmarEliminarModal
                abierto={confirmando}
                nombre={clienteAEliminar?.nombre}
                onConfirmar={confirmarEliminar}
                onCancelar={() => setConfirmando(false)}
            />
        </div>
    );
}