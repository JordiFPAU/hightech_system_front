import React from 'react';
import styles from '../categorias/CategoriasView.module.css';
import usuarioStyles from './UsuariosTabla.module.css';
import {BADGE_ROL} from '../../utils/usuariosUtils';

export default function UsuariosTabla({ usuarios, onEditar }) {
    return (
        <div className={styles.tablaContenedor}>
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length === 0 ? (
                        <tr>
                            <td colSpan={6} className={styles.sinDatos}>
                                No hay usuarios registrados
                            </td>
                        </tr>
                    ) : (
                        usuarios.map(usuario => {
                            const rolNombre = usuario.rol?.nombre || 'SIN ROL';
                            const badgeRol = BADGE_ROL[rolNombre] || { bg: '#f1f5f9', color: '#475569' };
                            return (
                                <tr key={usuario.id}>
                                    <td className={styles.nombreCell}>
                                        <div className={usuarioStyles.nombreConAvatar}>
                                            <div className={usuarioStyles.avatar}>
                                                {usuario.nombre[0]}{usuario.apellido[0]}
                                            </div>
                                            {usuario.nombre} {usuario.apellido}
                                        </div>
                                    </td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefono || '—'}</td>
                                    <td>
                                        <span
                                            className={usuarioStyles.badgeRol}
                                            style={{
                                                backgroundColor: badgeRol.bg,
                                                color: badgeRol.color
                                            }}
                                        >
                                            {rolNombre}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={usuario.activo
                                            ? styles.badgeActivo
                                            : styles.badgeInactivo}>
                                            {usuario.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className={styles.botonEditar}
                                            onClick={() => onEditar(usuario)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}