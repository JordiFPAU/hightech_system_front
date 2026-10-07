import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ onAbrirMenu }) {
    const { usuario, cerrarSesion } = useContext(AuthContext);
    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate('/login');
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.izquierda}>
                <button className={styles.botonMenu} onClick={onAbrirMenu}>
                    ☰
                </button>
                <span className={styles.titulo}>Panel de Control</span>
            </div>
            <div className={styles.derecha}>
                <span className={styles.email}>{usuario?.email}</span>
                <button
                    className={styles.botonSalir}
                    onClick={manejarCerrarSesion}
                >
                    Salir
                </button>
            </div>
        </div>
    );
}