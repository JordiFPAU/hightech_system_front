import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Siderbar.module.css';

export default function Sidebar({ abierto, onCerrar }) {
    const { usuario } = useContext(AuthContext);
    const location = useLocation();
    const rol = usuario?.rol?.nombre;

    const esAdmin = rol === 'ADMIN';
    const esAdminOGerente = rol === 'ADMIN' || rol === 'GERENTE';

    const enlaceActivo = (path) =>
        location.pathname === path
            ? `${styles.enlace} ${styles.enlaceActivo}`
            : styles.enlace;

    return (
        <div className={`${styles.sidebar} ${abierto ? styles.sidebarAbierto : ''}`}>
            <div className={styles.logoContenedor}>
                <h3 className={styles.titulo}>High Tech System</h3>
                <button className={styles.botonCerrar} onClick={onCerrar}>✕</button>
            </div>
            <hr className={styles.separador} />
            <nav className={styles.menu}>
                <div className={styles.seccion}>GENERAL</div>
                <Link to="/dashboard" className={enlaceActivo('/dashboard')} onClick={onCerrar}>
                    Dashboard
                </Link>

                {esAdminOGerente && (
                    <>
                        <div className={styles.seccion}>INVENTARIO</div>
                        <Link to="/categorias" className={enlaceActivo('/categorias')} onClick={onCerrar}>Categorías</Link>
                        <Link to="/proveedores" className={enlaceActivo('/proveedores')} onClick={onCerrar}>Proveedores</Link>
                        <Link to="/productos" className={enlaceActivo('/productos')} onClick={onCerrar}>Productos</Link>
                        <Link to="/alertas" className={enlaceActivo('/alertas')} onClick={onCerrar}>Alertas de stock</Link>
                    </>
                )}

                <div className={styles.seccion}>LOGÍSTICA</div>
                {esAdminOGerente && (
                    <Link to="/clientes" className={enlaceActivo('/clientes')} onClick={onCerrar}>Clientes</Link>
                )}
                <Link to="/pedidos" className={enlaceActivo('/pedidos')} onClick={onCerrar}>Órdenes</Link>
                <Link to="/entregas" className={enlaceActivo('/entregas')} onClick={onCerrar}>Entregas</Link>

                <div className={styles.seccion}>GEOLOCALIZACIÓN</div>
                <Link to="/monitoreo" className={enlaceActivo('/monitoreo')} onClick={onCerrar}>Mapa en tiempo real</Link>

                {esAdmin && (
                    <>
                        <div className={styles.seccion}>ADMIN</div>
                        <Link to="/usuarios" className={enlaceActivo('/usuarios')} onClick={onCerrar}>Usuarios</Link>
                    </>
                )}
            </nav>
        </div>
    );
}