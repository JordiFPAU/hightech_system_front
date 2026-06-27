import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { token, cargando } = useContext(AuthContext);

  if (cargando) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Verificando credenciales...</div>;
  }


  if (!token) {
    return <Navigate to="/login" replace />;
  }


  return <Outlet />;
}