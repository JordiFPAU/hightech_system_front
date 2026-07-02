import React from 'react';
import styles from '../categorias/CategoriasView.module.css';

export default function ProveedorModalForm({
    abierto,
    proveedorEditando,
    form,
    onChange,
    onGuardar,
    onCerrar,
    guardando,
    errorForm
}) {
    if (!abierto) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitulo}>
                        {proveedorEditando ? 'Editar proveedor' : 'Nuevo proveedor'}
                    </h2>
                    <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
                </div>

                {errorForm && <div className={styles.error}>{errorForm}</div>}

                <form onSubmit={onGuardar}>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Nombre *</label>
                        <input
                            type="text"
                            required
                            className={styles.input}
                            placeholder="Ej: HP Ecuador"
                            value={form.nombre}
                            onChange={e => onChange({ ...form, nombre: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Teléfono</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ej: 0999888777"
                            value={form.telefono}
                            onChange={e => onChange({ ...form, telefono: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Información adicional</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Notas sobre el proveedor"
                            rows={3}
                            value={form.infoAdicional}
                            onChange={e => onChange({ ...form, infoAdicional: e.target.value })}
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
                            {guardando ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}