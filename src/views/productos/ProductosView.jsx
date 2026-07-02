import React, { useEffect, useState } from 'react';
import {
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto,
    getCategorias,
    getProveedores
} from '../../api/inventarioApi';
import ProductosTabla from '../../components/productos/ProductosTabla';
import ProductoModalForm from '../../components/productos/ProductoModalForm';
import ConfirmarEliminarModal from '../../components/categorias/ConfirmarEliminarModal';
import styles from '../../components/categorias/CategoriasView.module.css';
import AjustarStockModal from '../../components/productos/AjustarStockModal';

const FORM_INICIAL = {
    nombre: '',
    descripcion: '',
    codigoMarca: '',
    precioVenta: '',
    precioCosto: '',
    stockActual: 0,
    stockMinimo: 10,
    fechaCaducidad: '',
    categoriaId: '',
    proveedorId: ''
};

export default function ProductosView() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);
    const [form, setForm] = useState(FORM_INICIAL);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

    const [confirmando, setConfirmando] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const [modalStockAbierto, setModalStockAbierto] = useState(false);
    const [productoStock, setProductoStock] = useState(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const [prodRes, catRes, provRes] = await Promise.all([
                getProductos(),
                getCategorias(),
                getProveedores()
            ]);
            setProductos(prodRes.data);
            setCategorias(catRes.data);
            setProveedores(provRes.data);
        } catch {
            setError('No se pudieron cargar los productos.');
        } finally {
            setCargando(false);
        }
    };

    const abrirCrear = () => {
        setProductoEditando(null);
        setForm(FORM_INICIAL);
        setErrorForm(null);
        setModalAbierto(true);
    };

    const abrirEditar = (producto) => {
        setProductoEditando(producto);
        setForm({
            nombre: producto.nombre,
            descripcion: producto.descripcion || '',
            codigoMarca: producto.codigoMarca || '',
            precioVenta: producto.precioVenta,
            precioCosto: producto.precioCosto,
            stockActual: producto.stockActual,
            stockMinimo: producto.stockMinimo,
            fechaCaducidad: producto.fechaCaducidad || '',
            categoriaId: producto.categoria?.id || '',
            proveedorId: producto.proveedor?.id || ''
        });
        setErrorForm(null);
        setModalAbierto(true);
    };
    const abrirAjustarStock = (producto) => {
        setProductoStock(producto);
        setModalStockAbierto(true);
    };


    const cerrarModal = () => {
        setModalAbierto(false);
        setProductoEditando(null);
        setErrorForm(null);
    };

    const manejarGuardar = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setErrorForm(null);

        const payload = {
            ...form,
            precioVenta: Number(form.precioVenta),
            precioCosto: Number(form.precioCosto),
            stockActual: Number(form.stockActual),
            stockMinimo: Number(form.stockMinimo),
            proveedorId: form.proveedorId || null,
            fechaCaducidad: form.fechaCaducidad || null
        };

        try {
            if (productoEditando) {
                await updateProducto(productoEditando.id, payload);
            } else {
                await createProducto(payload);
            }
            cerrarModal();
            cargarDatos();
        } catch (err) {
            setErrorForm(err.response?.data?.error || 'Error al guardar el producto.');
        } finally {
            setGuardando(false);
        }
    };

    const pedirConfirmacion = (producto) => {
        setProductoAEliminar(producto);
        setConfirmando(true);
    };

    const confirmarEliminar = async () => {
        try {
            await deleteProducto(productoAEliminar.id);
            setConfirmando(false);
            setProductoAEliminar(null);
            cargarDatos();
        } catch {
            setError('No se pudo eliminar el producto.');
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Productos</h1>
                    <p className={styles.subtitulo}>
                        {productos.length} productos registrados
                    </p>
                </div>
                <button className={styles.botonPrimario} onClick={abrirCrear}>
                    + Nuevo producto
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {cargando ? (
                <div className={styles.cargando}>Cargando productos...</div>
            ) : (
                <ProductosTabla
                    productos={productos}
                    onEditar={abrirEditar}
                    onEliminar={pedirConfirmacion}
                    onAjustarStock={abrirAjustarStock}
                />
            )}

            <ProductoModalForm
                abierto={modalAbierto}
                productoEditando={productoEditando}
                form={form}
                onChange={setForm}
                onGuardar={manejarGuardar}
                onCerrar={cerrarModal}
                guardando={guardando}
                errorForm={errorForm}
                categorias={categorias}
                proveedores={proveedores}
            />

            <ConfirmarEliminarModal
                abierto={confirmando}
                nombre={productoAEliminar?.nombre}
                onConfirmar={confirmarEliminar}
                onCancelar={() => setConfirmando(false)}
            />

            <AjustarStockModal
                abierto={modalStockAbierto}
                producto={productoStock}
                onCerrar={() => setModalStockAbierto(false)}
                onExito={cargarDatos}
            />

        </div>
    );
}