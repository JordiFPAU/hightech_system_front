import React from 'react';
import styles from '../categorias/CategoriasView.module.css';
import formStyles from './ProductoModalForm.module.css';

export default function ProductoModalForm({
    abierto,
    productoEditando,
    form,
    onChange,
    onGuardar,
    onCerrar,
    guardando,
    errorForm,
    categorias,
    proveedores
}) {
    if (!abierto) return null;

    return (
        <div className={styles.overlay}>
            <div className={formStyles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitulo}>
                        {productoEditando ? 'Editar producto' : 'Nuevo producto'}
                    </h2>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                {errorForm && <div className={styles.error}>{errorForm}</div>}

                <form onSubmit={onGuardar}>
                    <div className={formStyles.grilla}>

                        <div className={`${styles.campo} ${formStyles.campoCompleto}`}>
                            <label className={styles.etiqueta}>Nombre *</label>
                            <input
                                type="text"
                                required
                                className={styles.input}
                                placeholder="Ej: Tóner HP 85A"
                                value={form.nombre}
                                onChange={e => onChange({ ...form, nombre: e.target.value })}
                            />
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Código de marca</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Ej: CE285A"
                                value={form.codigoMarca}
                                onChange={e => onChange({ ...form, codigoMarca: e.target.value })}
                            />
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Fecha de caducidad</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={form.fechaCaducidad}
                                onChange={e => onChange({ ...form, fechaCaducidad: e.target.value })}
                            />
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Precio de venta *</label>
                            <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                className={styles.input}
                                placeholder="0.00"
                                value={form.precioVenta}
                                onChange={e => onChange({ ...form, precioVenta: e.target.value })}
                            />
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Precio de costo *</label>
                            <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                className={styles.input}
                                placeholder="0.00"
                                value={form.precioCosto}
                                onChange={e => onChange({ ...form, precioCosto: e.target.value })}
                            />
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Stock actual</label>
                            <input
                                type="number"
                                min="0"
                                className={styles.input}
                                placeholder="0"
                                value={form.stockActual}
                                onChange={e => onChange({ ...form, stockActual: e.target.value })}
                            />
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Stock mínimo</label>
                            <input
                                type="number"
                                min="0"
                                className={styles.input}
                                placeholder="10"
                                value={form.stockMinimo}
                                onChange={e => onChange({ ...form, stockMinimo: e.target.value })}
                            />
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Categoría *</label>
                            <select
                                required
                                className={styles.input}
                                value={form.categoriaId}
                                onChange={e => onChange({ ...form, categoriaId: e.target.value })}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Proveedor</label>
                            <select
                                className={styles.input}
                                value={form.proveedorId}
                                onChange={e => onChange({ ...form, proveedorId: e.target.value })}
                            >
                                <option value="">Sin proveedor</option>
                                {proveedores.map(prov => (
                                    <option key={prov.id} value={prov.id}>
                                        {prov.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`${styles.campo} ${formStyles.campoCompleto}`}>
                            <label className={styles.etiqueta}>Descripción</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Descripción opcional del producto"
                                rows={2}
                                value={form.descripcion}
                                onChange={e => onChange({ ...form, descripcion: e.target.value })}
                            />
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
                            disabled={guardando}
                        >
                            {guardando ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}