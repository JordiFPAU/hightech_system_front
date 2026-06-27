import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styles from './Layout.module.css'; 

export default function Layout() {
  return (
    <div className={styles.layoutContenedor}>
      <Sidebar />
      <Navbar />
      
      <div className={styles.contenidoDinamico}>
        <Outlet />
      </div>
    </div>
  );
}