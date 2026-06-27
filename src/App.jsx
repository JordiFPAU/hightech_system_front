import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginView from './views/auth/LoginView';


function DashboardTemporal() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>¡Panel Administrativo HighTech!</h1>
      <p>Bienvenido al sistema integrado de logística y almacenes.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {}
          <Route path="/login" element={<LoginView />} />

          {}
          <Route element={<ProtectedRoute />}>
            {}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardTemporal />} />
            </Route>
          </Route>

          {}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}