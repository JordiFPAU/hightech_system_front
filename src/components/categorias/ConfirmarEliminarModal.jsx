import React from 'react';
import styles from './CategoriasView.module.css';

export default function ConfirmarEliminarModal({ categoria, onClose, onConfirm }) {
  if (!categoria) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalPequeno}>
        <h2 className={styles.modalTitulo}>¿Eliminar categoría?</h2>
        <p className={styles.modalTexto}>
          Estás a punto de eliminar <strong>{categoria.nombre}</strong>. Esta acción no se puede deshacer.
        </p>
        <div className={styles.modalFooter}>
          <button className={styles.botonSecundario} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.botonEliminarModal} onClick={onConfirm}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}