import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importamos la configuración de Axios

// 1. Crear el Contexto
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// 2. Crear el Proveedor
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- LOGIN (Conectar con Backend) ---
  const login = async (email, password) => {
    try {
      // Petición POST a tu Spring Boot
      const response = await api.post('/auth/login', { email, password });
      
      // Extraer datos
      const { token, ...userData } = response.data; 

      // Guardar sesión
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Actualizar estado
      setCurrentUser(userData);
      
      return { success: true };

    } catch (error) {
      console.error("Error en login:", error);
      return { 
        success: false, 
        message: "Credenciales incorrectas o error de servidor" 
      };
    }
  };

  // --- REGISTRO (¡ESTA ES LA FUNCIÓN QUE FALTABA!) ---
  const registerUser = async (name, email, password) => {
    try {
      // Enviamos los datos al endpoint de registro
      await api.post('/auth/register', { name, email, password });
      return { success: true };
    } catch (error) {
      console.error("Error en registro:", error);
      // Leemos el mensaje de error del backend si existe
      const errorMsg = error.response?.data || "Error al registrar usuario";
      return { success: false, message: errorMsg };
    }
  };

  // --- LOGOUT ---
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  // --- PERSISTENCIA (Recargar página) ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false); 
  }, []);

  // Exportamos todo
  const value = {
    currentUser,
    login,
    registerUser, // <--- ¡Asegúrate de que esto esté aquí!
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}