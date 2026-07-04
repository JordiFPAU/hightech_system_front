import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ rolesPermitidos }) {
    const { token, usuario, cargando } = useContext(AuthContext);

    if (cargando) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>
            Verificando credenciales...
        </div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si se especifican roles y el usuario no tiene el rol requerido
    if (rolesPermitidos && !rolesPermitidos.includes(usuario?.rol?.nombre)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}