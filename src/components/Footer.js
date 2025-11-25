import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h3>Mil Sabores</h3>
          <p>ABlanco Encalada 1335, Renca, Santiago , Chile</p>
          <p>Horario: Lun–Sáb 9:00–19:00</p>
        </section>
        <section>
          <h3>Contacto</h3>
          <ul>
            <li><a href="tel:+56912345678">+56 9 78136844</a></li>
            <li><a href="mailto:ignacio.escalona@milsabores.cl">ignacio.escalona@milsabores.cl</a></li>
            <li><Link to="/contacto">Formulario</Link></li>
          </ul>
        </section>
        <section>
          <h3>Síguenos</h3>
          <ul className="social">
             {/* ...tus redes sociales... */}
          </ul>
        </section>
      </div>
      {/* El script de JS se reemplaza con esta simple línea de JSX.
      */}
      <small>© {new Date().getFullYear()} Pastelería Mil Sabores. Todos los derechos reservados.</small>
    </footer>
  );
}

export default Footer;
