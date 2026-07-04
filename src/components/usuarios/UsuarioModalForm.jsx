import React from 'react';
import styles from '../categorias/CategoriasView.module.css';

export default function UsuarioModalForm({
    abierto,
    usuarioEditando,
    form,
    onChange,
    onGuardar,
    onCerrar,
    guardando,
    errorForm,
    roles
}) {
    if (!abierto) return null;

    const esNuevo = !usuarioEditando;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitulo}>
                        {esNuevo ? 'Nuevo usuario' : 'Editar usuario'}
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
                            placeholder="Ej: Jordi"
                            value={form.nombre}
                            onChange={e => onChange({ ...form, nombre: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Apellido *</label>
                        <input
                            type="text"
                            required
                            className={styles.input}
                            placeholder="Ej: Pila"
                            value={form.apellido}
                            onChange={e => onChange({ ...form, apellido: e.target.value })}
                        />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.etiqueta}>Email *</label>
                        <input
                            type="email"
                            required
                            className={styles.input}
                            placeholder="Ej: jordi@hightech.com"
                            value={form.email}
                            onChange={e => onChange({ ...form, email: e.target.value })}
                        />
                    </div>
                    {esNuevo && (
                        <div className={styles.campo}>
                            <label className={styles.etiqueta}>Contraseña *</label>
                            <input
                                type="password"
                                required
                                className={styles.input}
                                placeholder="Mínimo 6 caracteres"
                                value={form.password}
                                onChange={e => onChange({ ...form, password: e.target.value })}
                            />
                        </div>
                    )}
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
                        <label className={styles.etiqueta}>Rol *</label>
                        <select
                            required
                            className={styles.input}
                            value={form.rolId}
                            onChange={e => onChange({ ...form, rolId: e.target.value })}
                        >
                            <option value="">Selecciona un rol</option>
                            {roles.map(rol => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.nombre}
                                </option>
                            ))}
                        </select>
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