import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css'; 

export default function Navbar() {
  const { usuario, cerrarSesion } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <span className={styles.textoPanel}>Panel de Control</span>
      
      <div className={styles.usuarioSeccion}>
        <span className={styles.email}>
          {usuario?.email || 'Admin Conectado'}
        </span>
        <button onClick={cerrarSesion} className={styles.botonSalir}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}