import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginView from './views/auth/LoginView';
import DashboardView from './views/dashboard/DashboardView';
import CategoriasView from './views/categoria/CategoriasView';
import ProveedoresView from "./views/proveedores/ProveedoresView";




export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          { }
          <Route path="/login" element={<LoginView />} />

          { }
          <Route element={<ProtectedRoute />}>
            { }
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/categorias" element={<CategoriasView />} /> 
              <Route path="/proveedores" element={<ProveedoresView />} />
            </Route>
          </Route>

          { }
          <Route path="*" element={<Navigate to="/login" replace />} />

          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}