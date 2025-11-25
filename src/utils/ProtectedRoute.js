import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Recibimos "roleRequired" como propiedad (ej: "ADMIN")
const ProtectedRoute = ({ roleRequired }) => {
  const { currentUser } = useAuth();

  // 1. Si NO hay usuario logueado, mandar al Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si se requiere un rol específico y el usuario NO lo tiene
  // (Comparar 'ADMIN' con el rol que viene del Backend)
  if (roleRequired && currentUser.role !== roleRequired) {
    alert("⛔ Acceso denegado: No tienes permisos para esta sección.");
    return <Navigate to="/" replace />;
  }

  // 3. Si pasa las validaciones, mostrar la ruta
  return <Outlet />;
};

export default ProtectedRoute;