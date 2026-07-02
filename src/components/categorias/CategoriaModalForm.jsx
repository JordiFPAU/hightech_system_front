import React, { useState, useEffect } from 'react';
import styles from './CategoriasView.module.css';

export default function CategoriaModalForm({ categoria, errorForm, guardando, onClose, onSave }) {
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  useEffect(() => {
    if (categoria) {
      setForm({ nombre: categoria.nombre, descripcion: categoria.descripcion || '' });
    } else {
      setForm({ nombre: '', descripcion: '' });
    }
  }, [categoria]);

  const enviarFormulario = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitulo}>
            {categoria ? 'Editar categoría' : 'Nueva categoría'}
          </h2>
          <button className={styles.botonCerrar} onClick={onClose}>✕</button>
        </div>

        {errorForm && <div className={styles.error}>{errorForm}</div>}

        <form onSubmit={enviarFormulario}>
          <div className={styles.campo}>
            <label className={styles.etiqueta}>Nombre *</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder="Ej:Toner Original HP 12A"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div className={styles.campo}>
            <label className={styles.etiqueta}>Descripción</label>
            <textarea
              className={styles.textarea}
              placeholder="Descripción opcional"
              rows={3}
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={styles.botonSecundario} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.botonPrimario} disabled={guardando}>
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}