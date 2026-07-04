import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Siderbar.module.css';

export default function Sidebar() {
    const { usuario } = useContext(AuthContext);
    const rol = usuario?.rol?.nombre;

    const esAdmin = rol === 'ADMIN';
    const esAdminOGerente = rol === 'ADMIN' || rol === 'GERENTE';

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.titulo}>High Tech System</h3>
            <hr className={styles.separador} />
            <nav className={styles.menu}>
                <div className={styles.seccion}>GENERAL</div>
                <Link to="/dashboard" className={styles.enlace}>Dashboard</Link>

                {esAdminOGerente && (
                    <>
                        <div className={styles.seccion}>INVENTARIO</div>
                        <Link to="/categorias" className={styles.enlace}>Categorías</Link>
                        <Link to="/proveedores" className={styles.enlace}>Proveedores</Link>
                        <Link to="/productos" className={styles.enlace}>Productos</Link>
                        <Link to="/alertas" className={styles.enlace}>Alertas de stock</Link>
                    </>
                )}

                <div className={styles.seccion}>LOGÍSTICA</div>
                {esAdminOGerente && (
                    <Link to="/clientes" className={styles.enlace}>Clientes</Link>
                )}
                <Link to="/pedidos" className={styles.enlace}>Órdenes</Link>
                <Link to="/entregas" className={styles.enlace}>Entregas</Link>

                <div className={styles.seccion}>GEOLOCALIZACIÓN</div>
                <Link to="/monitoreo" className={styles.enlace}>Mapa en tiempo real</Link>

                {esAdmin && (
                    <>
                        <div className={styles.seccion}>ADMIN</div>
                        <Link to="/usuarios" className={styles.enlace}>Usuarios</Link>
                    </>
                )}
            </nav>
        </div>
    );
}