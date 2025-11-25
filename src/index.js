import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa BrowserRouter aquí para que envuelva a los Contextos
import { BrowserRouter } from 'react-router-dom'; 

// Importa tus estilos
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa el componente principal y los Providers de Contexto
import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Obtiene el elemento raíz del HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    {/* 1. BrowserRouter debe ser el PADRE SUPREMO para que useNavigate funcione en los Contextos */}
    <BrowserRouter> 
      
      {/* 2. Proveedor de Autenticación */}
      <AuthProvider>
        
        {/* 3. Proveedor del Carrito */}
        <CartProvider>
          
          {/* 4. Tu App */}
          <App />
          
        </CartProvider>
      </AuthProvider>
      
    </BrowserRouter> 
  </React.StrictMode>
);