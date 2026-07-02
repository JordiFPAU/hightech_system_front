import React from 'react';
import styles from '../categorias/CategoriasView.module.css';

export default function ProveedoresTabla({ proveedores, onEditar, onEliminar }) {
    return (
        <div className={styles.tablaContenedor}>
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Información adicional</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.length === 0 ? (
                        <tr>
                            <td colSpan={5} className={styles.sinDatos}>
                                No hay proveedores registrados
                            </td>
                        </tr>
                    ) : (
                        proveedores.map(prov => (
                            <tr key={prov.id}>
                                <td className={styles.nombreCell}>{prov.nombre}</td>
                                <td>{prov.telefono || '—'}</td>
                                <td className={styles.descripcionCell}>
                                    {prov.infoAdicional || '—'}
                                </td>
                                <td>
                                    <span className={prov.activo
                                        ? styles.badgeActivo
                                        : styles.badgeInactivo}>
                                        {prov.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.acciones}>
                                        <button
                                            className={styles.botonEditar}
                                            onClick={() => onEditar(prov)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={styles.botonEliminar}
                                            onClick={() => onEliminar(prov)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}