import React, { useEffect, useState, useCallback } from 'react';
import { getUsuarios, getRoles, createUsuario } from '../../api/authApi';
import UsuariosTabla from '../../components/usuarios/UsuariosTabla';
import UsuarioModalForm from '../../components/usuarios/UsuarioModalForm';
import styles from '../../components/categorias/CategoriasView.module.css';

const FORM_INICIAL = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    rolId: ''
};

export default function UsuariosView() {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [form, setForm] = useState(FORM_INICIAL);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

    const cargarDatos = useCallback(async () => {
        try {
            setCargando(true);
            setError(null);
            const [usuariosRes, rolesRes] = await Promise.all([
                getUsuarios(),
                getRoles()
            ]);
            setUsuarios(usuariosRes.data);
            setRoles(rolesRes.data);
        } catch {
            setError('No se pudieron cargar los usuarios.');
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    const abrirCrear = () => {
        setUsuarioEditando(null);
        setForm(FORM_INICIAL);
        setErrorForm(null);
        setModalAbierto(true);
    };

    const abrirEditar = (usuario) => {
        setUsuarioEditando(usuario);
        setForm({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: '',
            telefono: usuario.telefono || '',
            rolId: usuario.rol?.id || ''
        });
        setErrorForm(null);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setUsuarioEditando(null);
        setErrorForm(null);
    };

    const manejarGuardar = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setErrorForm(null);

        try {
            await createUsuario(form);
            cerrarModal();
            cargarDatos();
        } catch (err) {
            setErrorForm(err.response?.data?.error || 'Error al guardar el usuario.');
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Usuarios</h1>
                    <p className={styles.subtitulo}>
                        {usuarios.length} usuarios registrados
                    </p>
                </div>
                <button className={styles.botonPrimario} onClick={abrirCrear}>
                    + Nuevo usuario
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {cargando ? (
                <div className={styles.cargando}>Cargando usuarios...</div>
            ) : (
                <UsuariosTabla
                    usuarios={usuarios}
                    onEditar={abrirEditar}
                />
            )}

            <UsuarioModalForm
                abierto={modalAbierto}
                usuarioEditando={usuarioEditando}
                form={form}
                onChange={setForm}
                onGuardar={manejarGuardar}
                onCerrar={cerrarModal}
                guardando={guardando}
                errorForm={errorForm}
                roles={roles}
            />
        </div>
    );
}