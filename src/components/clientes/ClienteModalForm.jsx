import React from 'react';
import styles from '../categorias/CategoriasView.module.css';

export default function ClienteModalForm({
    abierto,
    clienteEditando,
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
                        {clienteEditando ? 'Editar cliente' : 'Nuevo cliente'}
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
                            placeholder="Ej: Empresa ABC"
                            value={form.nombre}
                            onChange={e => onChange({ ...form, nombre: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>RUC / CI</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ej: 1790012345001"
                            value={form.rucCi}
                            onChange={e => onChange({ ...form, rucCi: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Teléfono</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ej: 0999111222"
                            value={form.telefono}
                            onChange={e => onChange({ ...form, telefono: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Correo</label>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="Ej: contacto@empresa.com"
                            value={form.correo}
                            onChange={e => onChange({ ...form, correo: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Dirección</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Ej: Av. Amazonas y Naciones Unidas, Quito"
                            rows={2}
                            value={form.direccion}
                            onChange={e => onChange({ ...form, direccion: e.target.value })}
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