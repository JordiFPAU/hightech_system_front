import React from 'react';
import styles from './CategoriasView.module.css';

export default function CategoriasTabla({ categorias, onEditar, onEliminar }) {
  if (categorias.length === 0) {
    return (
      <div className={styles.tablaContenedor}>
        <table className={styles.tabla}>
          <tbody>
            <tr>
              <td className={styles.sinDatos}>No hay categorías registradas.</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={styles.tablaContenedor}>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => (
            <tr key={cat.id}>
              <td className={styles.nombreCell}>{cat.nombre}</td>
              <td className={styles.descripcionCell}>{cat.descripcion || '—'}</td>
              <td>
                <span className={cat.activo ? styles.badgeActivo : styles.badgeInactivo}>
                  {cat.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <div className={styles.acciones}>
                  <button className={styles.botonEditar} onClick={() => onEditar(cat)}>
                    Editar
                  </button>
                  <button className={styles.botonEliminar} onClick={() => onEliminar(cat)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}