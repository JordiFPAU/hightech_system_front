import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styles from './Layout.module.css';

export default function Layout() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className={styles.layoutContenedor}>
      {/* Overlay para cerrar sidebar en móvil */}
      {sidebarAbierto && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarAbierto(false)}
        />
      )}

      <Sidebar
        abierto={sidebarAbierto}
        onCerrar={() => setSidebarAbierto(false)}
      />

      <div className={styles.principal}>
        <Navbar onAbrirMenu={() => setSidebarAbierto(true)} />
        <div className={styles.contenidoDinamico}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}