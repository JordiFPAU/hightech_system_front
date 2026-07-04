import React from 'react';
import styles from '../categorias/CategoriasView.module.css';

export default function ClientesTabla({ clientes, onEditar, onEliminar, onVerPuntos }) {
    return (
        <div className={styles.tablaContenedor}>
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RUC / CI</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length === 0 ? (
                        <tr>
                            <td colSpan={6} className={styles.sinDatos}>
                                No hay clientes registrados
                            </td>
                        </tr>
                    ) : (
                        clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td className={styles.nombreCell}>{cliente.nombre}</td>
                                <td>{cliente.rucCi || '—'}</td>
                                <td>{cliente.telefono || '—'}</td>
                                <td>{cliente.correo || '—'}</td>
                                <td>
                                    <span className={cliente.activo
                                        ? styles.badgeActivo
                                        : styles.badgeInactivo}>
                                        {cliente.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.acciones}>
                                        <button
                                            className={styles.botonEditar}
                                            onClick={() => onEditar(cliente)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={styles.botonEditar}
                                            onClick={() => onVerPuntos(cliente)}
                                        >
                                            Puntos
                                        </button>
                                        <button
                                            className={styles.botonEliminar}
                                            onClick={() => onEliminar(cliente)}
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