import React from "react";
import { Link } from "react-router-dom";
import styles from "./Siderbar.module.css";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <h3 className={styles.titulo}> High Tech System</h3>
            <hr className={styles.separador} />
            <nav className={styles.menu}>
                <Link to="/dashboard" className={styles.enlace}>Dashboard</Link>

                <div className={styles.seccion}>INVENTARIO</div>
                <Link to="/categorias" className={styles.enlace}>Categorías</Link>
                <Link to="/productos" className={styles.enlace}>Productos</Link>
                <Link to="/proveedores" className={styles.enlace}>Proveedores</Link>
                <Link to="/alertas" className={styles.enlace}>Alertas de Stock</Link>

                

                <div className={styles.seccion}>LOGÍSTICA</div>
                <Link to="/clientes" className={styles.enlace}>Gestión Clientes</Link>
                <Link to="/pedidos" className={styles.enlace}>Órdenes de Entrega</Link>

                <div className={styles.seccion}>GEOLOCALIZACIÓN</div>
                <Link to="/monitoreo" className={styles.enlace}>Mapa en Tiempo Real</Link>
            </nav>
        </div>
    );
}
