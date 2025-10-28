import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa BrowserRouter aquí
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
    {/* BrowserRouter envuelve toda la aplicación */}
    <BrowserRouter> 
      <AuthProvider>
        <CartProvider>
          {/* App ahora está dentro de todos los providers y el router */}
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter> 
  </React.StrictMode>
);

