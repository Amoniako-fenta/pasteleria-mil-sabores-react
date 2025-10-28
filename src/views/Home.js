import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'; // Importa el Carrusel
import { products } from '../data/products'; // Importa tus datos de productos

// Selecciona los primeros 4 productos para mostrar en el carrusel
const featuredProducts = products.slice(0, 4);

function Home() {
  return (
    <>
      {/* --- 1. SECCIÓN HERO (SIN CAMBIOS) --- */}
      <main id="main">
        <section className="hero">
          {/* ... (contenido del hero) ... */}
          <div className="hero__content">
            <h1>Pastelería artesanal hecha con amor</h1>
            <p>Pedidos a medida para cumpleaños, matrimonios y eventos corporativos.</p>
            <Link className="btn btn-primary" to="/catalogo">Ver catálogo</Link>
          </div>
          <picture>
            <img 
              src="https://i.ytimg.com/vi/wl4UYWlB49o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpbRw8brEOtWDk3zXlXCyjVPLy7g" 
              alt="Torta decorada" 
            />
          </picture>
        </section>

        {/* --- 2. SECCIÓN FEATURES (SIN CAMBIOS) --- */}
        <section className="features" aria-label="Destacados">
          <article className="card">
            <h2>Ingredientes de calidad</h2>
            <p>Utilizamos insumos frescos y seleccionados, priorizando proveedores locales.</p>
          </article>
          <article className="card">
            <h2>Personalización</h2>
            <p>Diseñamos tu torta con sabores y decoración a tu gusto.</p>
          </article>
          <article className="card">
            <h2>Entrega puntual</h2>
            <p>Retiro en tienda o envío a domicilio coordinado.</p>
          </article>
        </section>

        {/* --- 3. SECCIÓN DEL CARRUSEL (ACTUALIZADA) --- */}
        <section className="home-carousel-section" aria-label="Productos Destacados">
          <h2>Productos Destacados</h2>
          {/* Añadimos 'controls={true}' para asegurar que las flechas se muestren */}
          <Carousel indicators={false} controls={true}>
            {featuredProducts.map((product) => (
              <Carousel.Item key={product.id}>
                <img
                  className="d-block w-100 carousel-img"
                  src={product.img}
                  alt={product.name}
                />
                <Carousel.Caption className="carousel-caption-custom">
                  <h3>{product.name}</h3>
                  <p>{product.description.substring(0, 80)}...</p>
                  <Link to="/catalogo" className="btn btn-secondary">Ver más</Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>
      </main>

      {/* --- 4. SECCIÓN COMUNIDAD (SIN CAMBIOS) --- */}
      <section className="comunidad">
        <h2>Contenido Educativo y de Comunidad</h2>
        <p>Descubre recetas, consejos y colaboraciones de nuestros estudiantes de gastronomía.</p>
        <div className="grid-cards">
          <article className="card-blog">
            <img src="https://i.pinimg.com/736x/3d/cb/7f/3dcb7f9278e3c686155ab774ca907fda.jpg" alt="Receta de kuchen tradicional" />
            <h3>Kuchen Tradicional Alemán</h3>
            <p>Aprende a preparar un delicioso kuchen de manzana...</p>
            <Link to="#" className="btn btn-secondary">Leer más</Link>
          </article>
          <article className="card-blog">
            <img src="https://i.pinimg.com/1200x/fd/29/d0/fd29d069389e1d5226c2c09cf00dfa6e.jpg" alt="Consejos de repostería saludable" />
            <h3>Repostería Saludable</h3>
            <p>Consejos prácticos para reducir azúcar y grasas...</p>
            <Link to="#" className="btn btn-secondary">Leer más</Link>
          </article>
          <article className="card-blog">
            <img src="https://i.pinimg.com/1200x/90/11/7a/90117af3e120f7e60a599e77d82e8443.jpg" alt="Colaboración estudiantil" />
            <h3>Colaboraciones Estudiantiles</h3>
            <p>Nuestros estudiantes comparten su experiencia...</p>
            <Link to="#" className="btn btn-secondary">Leer más</Link>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;


