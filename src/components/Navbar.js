import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { itemCount, openCart } = useCart();

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <img 
          src="https://img.freepik.com/vector-premium/logotipo-pasteleria-fondo-blanco_1197524-14327.jpg" 
          alt="Logo Pastelería Mil Sabores" 
          style={{ height: '50px' }} 
        />
      </Link>

      <nav aria-label="principal">
        <ul id="menu" className="menu">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/catalogo">Catálogo</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
          
          {!currentUser ? (
            <>
              <li><Link to="/registro">Registrarse</Link></li>
              <li><Link to="/login" className="btn btn-primary">Iniciar Sesión</Link></li>
            </>
          ) : (
            <>
              {/* --- CORRECCIÓN AQUÍ --- */}
              {/* Antes decías: currentUser.isAdmin */}
              {/* Ahora decimos: currentUser.role === 'ADMIN' */}
              {currentUser.role === 'ADMIN' && (
                  <li>
                    <NavLink to="/admin" className="btn btn-warning" style={{fontWeight: 'bold'}}>
                      Panel Admin
                    </NavLink>
                  </li>
              )}
              
              {/* El saludo es solo texto, no hace nada */}
              <li>
                <span className="user-greeting">
                  Hola, {currentUser.name || currentUser.email.split('@')[0]}
                </span>
              </li>

              <li>
                <button onClick={logout} className="btn btn-secondary">
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          
          <li>
            <button id="cartBtn" className="btn" onClick={openCart}>
              🛒 Carrito ({itemCount})
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;