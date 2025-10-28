    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom'; // <-- 1. Importa aquí

    import './styles.css';
    import 'bootstrap/dist/css/bootstrap.min.css';

    import App from './App';
    import { CartProvider } from './context/CartContext';
    import { AuthProvider } from './context/AuthContext';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        {/* 2. BrowserRouter ahora es el componente principal */}
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
