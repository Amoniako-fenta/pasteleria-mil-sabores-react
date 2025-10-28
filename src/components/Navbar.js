// en src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- 1. Importa el hook
import logo from '../media/logo.png';

function Navbar() {
  const { currentUser, logout } = useAuth(); // <-- 2. Obtiene el estado y la función

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <img src={logo} alt="Logo Pastelería Mil Sabores" />
        <span></span>
      </Link>

      <nav aria-label="principal">
        <ul id="menu" className="menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          
          {/* 3. LÓGICA DE REACT: Reemplaza tu script de index.html */}
          {!currentUser ? (
            // Si NO hay usuario logueado
            <li><Link to="/login" className="btn">Iniciar Sesión</Link></li>
          ) : (
            // Si SÍ hay usuario logueado
            <>
              <li><span className="user-greeting">Hola, {currentUser}</span></li>
              <li>
                <button onClick={logout} className="btn btn-secondary">
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
