import React, { useEffect, useState } from 'react';
import {
    getProveedores,
    createProveedor,
    updateProveedor,
    deleteProveedor
} from '../../api/inventarioApi';
import ProveedoresTabla from '../../components/proveedores/ProveedoresTabla';
import ProveedorModalForm from '../../components/proveedores/ProveedorModalForm';
import ConfirmarEliminarModal from '../../components/categorias/ConfirmarEliminarModal';
import styles from '../../components/categorias/CategoriasView.module.css';

const FORM_INICIAL = { nombre: '', telefono: '', infoAdicional: '' };

export default function ProveedoresView() {
    const [proveedores, setProveedores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [proveedorEditando, setProveedorEditando] = useState(null);
    const [form, setForm] = useState(FORM_INICIAL);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

    const [confirmando, setConfirmando] = useState(false);
    const [proveedorAEliminar, setProveedorAEliminar] = useState(null);

    useEffect(() => {
        cargarProveedores();
    }, []);

    const cargarProveedores = async () => {
        try {
            setCargando(true);
            const res = await getProveedores();
            setProveedores(res.data);
        } catch {
            setError('No se pudieron cargar los proveedores.');
        } finally {
            setCargando(false);
        }
    };

    const abrirCrear = () => {
        setProveedorEditando(null);
        setForm(FORM_INICIAL);
        setErrorForm(null);
        setModalAbierto(true);
    };

    const abrirEditar = (proveedor) => {
        setProveedorEditando(proveedor);
        setForm({
            nombre: proveedor.nombre,
            telefono: proveedor.telefono || '',
            infoAdicional: proveedor.infoAdicional || ''
        });
        setErrorForm(null);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setProveedorEditando(null);
        setErrorForm(null);
    };

    const manejarGuardar = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setErrorForm(null);

        try {
            if (proveedorEditando) {
                await updateProveedor(proveedorEditando.id, form);
            } else {
                await createProveedor(form);
            }
            cerrarModal();
            cargarProveedores();
        } catch (err) {
            setErrorForm(err.response?.data?.error || 'Error al guardar el proveedor.');
        } finally {
            setGuardando(false);
        }
    };

    const pedirConfirmacion = (proveedor) => {
        setProveedorAEliminar(proveedor);
        setConfirmando(true);
    };

    const confirmarEliminar = async () => {
        try {
            await deleteProveedor(proveedorAEliminar.id);
            setConfirmando(false);
            setProveedorAEliminar(null);
            cargarProveedores();
        } catch {
            setError('No se pudo eliminar el proveedor.');
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Proveedores</h1>
                    <p className={styles.subtitulo}>
                        {proveedores.length} proveedores registrados
                    </p>
                </div>
                <button className={styles.botonPrimario} onClick={abrirCrear}>
                    + Nuevo proveedor
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {cargando ? (
                <div className={styles.cargando}>Cargando proveedores...</div>
            ) : (
                <ProveedoresTabla
                    proveedores={proveedores}
                    onEditar={abrirEditar}
                    onEliminar={pedirConfirmacion}
                />
            )}

            <ProveedorModalForm
                abierto={modalAbierto}
                proveedorEditando={proveedorEditando}
                form={form}
                onChange={setForm}
                onGuardar={manejarGuardar}
                onCerrar={cerrarModal}
                guardando={guardando}
                errorForm={errorForm}
            />

            <ConfirmarEliminarModal
                abierto={confirmando}
                nombre={proveedorAEliminar?.nombre}
                onConfirmar={confirmarEliminar}
                onCancelar={() => setConfirmando(false)}
            />
        </div>
    );
}