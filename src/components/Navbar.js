    import React from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';
    import { useCart } from '../context/CartContext';
    // BORRA o COMENTA la línea de import logo:
    // import logo from '../media/logo.png'; 

    function Navbar() {
      const { currentUser, logout } = useAuth();
      const { itemCount, openCart } = useCart();

      return (
        <header className="site-header">
          <Link className="brand" to="/">
            {/* OPCIÓN A: Si ya moviste 'media' a 'public' y tienes logo.png */}
            <img src="/media/logo.png" alt="Logo Pastelería Mil Sabores" />
            
            {/* OPCIÓN B: Si aún no tienes la imagen, usa texto */}
            {/* <span>Pastelería Mil Sabores</span> */}
          </Link>

          <nav aria-label="principal">
            <ul id="menu" className="menu">
              <li><NavLink to="/">Inicio</NavLink></li>
              <li><NavLink to="/catalogo">Catálogo</NavLink></li>
              <li><NavLink to="/nosotros">Nosotros</NavLink></li>
              <li><NavLink to="/contacto">Contacto</NavLink></li>
              
              {!currentUser ? (
                <li><Link to="/login" className="btn btn-primary">Iniciar Sesión</Link></li>
              ) : (
                <>
                  {currentUser.isAdmin && (
                     <li><NavLink to="/admin">Admin</NavLink></li>
                  )}
                  <li><span className="user-greeting">Hola, {currentUser.email.split('@')[0]}</span></li>
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
