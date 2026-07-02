import React, { useEffect, useState } from "react";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "../../api/inventarioApi";
import styles from "../../components/categorias/CategoriasView.module.css"

import CategoriasTabla from "../../components/categorias/CategoriasTabla";
import CategoriaModalForm from "../../components/categorias/CategoriaModalForm";
import ConfirmarEliminarModal from "../../components/categorias/ConfirmarEliminarModal";
export default function CategoriasView() {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);


    const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            setCargando(true);
            const res = await getCategorias();
            setCategorias(res.data);
        } catch (err) {
            setError('No se pudieron cargar las categorías desde el servidor.');
        } finally {
            setCargando(false);
        }
    };

    const ejecutarGuardar = async (datosFormulario) => {
        setGuardando(true);
        setErrorForm(null);
        try {
            if (categoriaEditando) {
                await updateCategoria(categoriaEditando.id, datosFormulario);
            } else {
                await createCategoria(datosFormulario);
            }
            setModalAbierto(false);
            setCategoriaEditando(null);
            cargarCategorias();
        } catch (err) {
            setErrorForm(err.response?.data?.error || 'Error al procesar la solicitud.');
        } finally {
            setGuardando(false);
        }
    };

    const ejecutarEliminar = async () => {
        try {
            await deleteCategoria(categoriaAEliminar.id);
            setCategoriaAEliminar(null);
            cargarCategorias();
        } catch (err) {
            setError('No se pudo eliminar la categoría seleccionada.');
        }
    };

    return (
        <div className={styles.contenedor}>
            {/* Encabezado */}
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Categorías</h1>
                    <p className={styles.subtitulo}>{categorias.length} categorías registradas</p>
                </div>
                <button className={styles.botonPrimario} onClick={() => { setCategoriaEditando(null); setModalAbierto(true); }}>
                    + Nueva categoría
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {/* 1. Vista de la Tabla */}
            {cargando ? (
                <div className={styles.cargando}>Cargando datos desde HighTech Backend...</div>
            ) : (
                <CategoriasTabla
                    categorias={categorias}
                    onEditar={(cat) => { setCategoriaEditando(cat); setModalAbierto(true); }}
                    onEliminar={(cat) => setCategoriaAEliminar(cat)}
                />
            )}

            {/* 2. Componente Modal Formulario (Crear/Editar) */}
            {modalAbierto && (
                <CategoriaModalForm
                    categoria={categoriaEditando}
                    errorForm={errorForm}
                    guardando={guardando}
                    onClose={() => { setModalAbierto(false); setCategoriaEditando(null); }}
                    onSave={ejecutarGuardar}
                />
            )}

            {/* 3. Componente Modal Confirmar Eliminación */}
            {categoriaAEliminar && (
                <ConfirmarEliminarModal
                    categoria={categoriaAEliminar}
                    onClose={() => setCategoriaAEliminar(null)}
                    onConfirm={ejecutarEliminar}
                />
            )}
        </div>
    );
}