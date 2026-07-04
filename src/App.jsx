import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginView from './views/auth/LoginView';
import DashboardView from './views/dashboard/DashboardView';
import CategoriasView from './views/categoria/CategoriasView';
import ProveedoresView from "./views/proveedores/ProveedoresView";
import ProductosView from './views/productos/ProductosView';
import AlertasView from './views/alertas/AlertasView';
import ClientesView from './views/clientes/ClientesView';
import PedidosView from './views/pedidos/PedidosView';
import EntregasView from './views/entregas/EntregasView';
import MonitoreoView from './views/monitoreo/MonitoreoView';
import UsuariosView from './views/usuarios/UsuariosView';





export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          { }
          <Route path="/login" element={<LoginView />} />

          { }
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Todos los roles */}
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/productos" element={<ProductosView />} />
              <Route path="/pedidos" element={<PedidosView />} />
              <Route path="/entregas" element={<EntregasView />} />
              <Route path="/monitoreo" element={<MonitoreoView />} />

              {/* Solo ADMIN y GERENTE */}
              <Route element={<ProtectedRoute rolesPermitidos={['ADMIN', 'GERENTE']} />}>
                <Route path="/categorias" element={<CategoriasView />} />
                <Route path="/proveedores" element={<ProveedoresView />} />
                <Route path="/alertas" element={<AlertasView />} />
                <Route path="/clientes" element={<ClientesView />} />
              </Route>

              {/* Solo ADMIN */}
              <Route element={<ProtectedRoute rolesPermitidos={['ADMIN']} />}>
                <Route path="/usuarios" element={<UsuariosView />} />
              </Route>
            </Route>
          </Route>

          { }
          <Route path="*" element={<Navigate to="/login" replace />} />


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}