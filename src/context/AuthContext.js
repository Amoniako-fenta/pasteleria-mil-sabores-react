import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Crear el Proveedor (Provider)
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Revisa el localStorage al cargar la app,
    // (replicando la lógica de tu index.html)
    return localStorage.getItem("usuarioLogueado");
  });
  
  const navigate = useNavigate();

  // 3. Función de Login (reemplaza tu script de login.html)
  const login = (email, password) => {
    
    // Replicamos la lógica EXACTA de tu JS:
    const storedPassword = localStorage.getItem(email);
    
    if (storedPassword === password) {
      // Éxito:
      setCurrentUser(email); // Actualiza el estado global de React
      localStorage.setItem("usuarioLogueado", email); // Guarda en localStorage
      alert("Bienvenido de nuevo, " + email);
      navigate('/'); // Redirige al inicio
      return true;
    } else {
      // Fracaso:
      alert("Usuario o contraseña incorrecta.");
      return false;
    }
  };

  // 4. Función de Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("usuarioLogueado");
    navigate('/login');
  };

  // 5. Valor que se comparte a toda la app
  const value = {
    currentUser,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 6. Hook personalizado para usarlo fácil
export const useAuth = () => {
  return useContext(AuthContext);
};
