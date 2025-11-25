import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importamos la configuración de Axios que creamos antes

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Crear el Proveedor
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo: Para no mostrar la app hasta verificar sesión
  const navigate = useNavigate();

  // 3. Función de Login (CONECTADA AL BACKEND)
  const login = async (email, password) => {
    try {
      // Petición POST a tu Spring Boot
      const response = await api.post('/auth/login', { email, password });
      
      // Si llegamos aquí, las credenciales son correctas
      // Extraemos el token y los datos del usuario de la respuesta JSON
      const { token, ...userData } = response.data; 

      // Guardamos en LocalStorage para que la sesión no se pierda al recargar
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Actualizamos el estado de React
      setCurrentUser(userData);
      
      return { success: true };

    } catch (error) {
      console.error("Error en login:", error);
      // Devolvemos false para que la vista muestre el mensaje de error
      return { 
        success: false, 
        message: "Credenciales incorrectas o error de servidor" 
      };
    }
  };

  // 4. Función de Logout
  const logout = () => {
    // Limpiamos todo
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  // 5. EFECTO: Recuperar sesión al recargar la página (Persistencia)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      // Si hay datos guardados, restauramos la sesión automáticamente
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false); // Terminamos de cargar
  }, []);

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 6. Hook personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};