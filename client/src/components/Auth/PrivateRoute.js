import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Por ahora, siempre permitimos el acceso
  // Más adelante implementaremos la lógica de autenticación
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;