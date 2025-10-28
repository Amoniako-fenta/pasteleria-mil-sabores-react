import React, { useState, useMemo } from 'react';
import { products } from '../data/products'; // Importa los datos
import ProductCard from '../components/ProductCard'; // Importa el componente de tarjeta

// Define las categorías para los botones de filtro
const categories = [
  { id: 'all', name: 'Todo' },
  { id: 'tortas-cuadradas', name: 'Tortas Cuadradas' },
  { id: 'tortas-circulares', name: 'Tortas Circulares' },
  { id: 'postres-individuales', name: 'Postres Individuales' },
  { id: 'sin-azucar', name: 'Sin Azúcar' },
  { id: 'pasteleria-tradicional', name: 'Pastelería Tradicional' },
  { id: 'sin-gluten', name: 'Sin Gluten' },
  { id: 'vegana', name: 'Vegana' },
  { id: 'tortas-especiales', name: 'Tortas Especiales' }
];

function Catalogo() {
  // 1. ESTADO: Guarda la categoría activa. Por defecto, 'all'.
  const [activeFilter, setActiveFilter] = useState('all');

  // 2. LÓGICA DE FILTRADO (La "Magia" de React)
  // useMemo optimiza para que el filtrado solo se ejecute cuando cambie el filtro.
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return products; // Si el filtro es 'all', devuelve todos los productos
    }
    // Si no, devuelve solo los productos que coinciden con la categoría
    return products.filter(product => product.category === activeFilter);
  }, [activeFilter]); // Se vuelve a ejecutar solo si 'activeFilter' cambia

  return (
    <>
      <header className="page-header">
        <h1>Catálogo de Productos</h1>
        <p>Selecciona una categoría para ver los productos disponibles.</p>
        <div className="filters">
          {/* Mapea las categorías para crear los botones de filtro dinámicamente */}
          {categories.map(category => (
            <button
              key={category.id}
              // Cambia la clase a 'active' si coincide con el estado
              className={`chip ${activeFilter === category.id ? 'active' : ''}`}
              // Al hacer clic, actualiza el estado del filtro
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>

      <section className="grid productos">
        {/* Mapea sobre la lista de productos YA FILTRADA y renderiza una tarjeta para cada uno */}
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      
      {/* La sección de info extra puede ir aquí o en otro componente */}
      <section className="info-extra">
          <h3>Origen de productos</h3>
          <p>
            Nuestras recetas tradicionales provienen de generaciones de reposteros artesanales,
            manteniendo el sabor y la autenticidad de la pastelería clásica.
          </p>
          <h3>Recomendaciones personalizadas</h3>
          <p>
            Explora nuestro catálogo y te daremos sugerencias según lo que más te guste. 🍰
          </p>
          <h3>Impacto Comunitario</h3>
          <p>
            Con cada compra apoyas a los estudiantes de la 
            <strong>Escuela de Administración y Negocios</strong>, quienes participan en la elaboración
            y perfeccionamiento de nuestras recetas.
          </p>
      </section>
    </>
  );
}

export default Catalogo;


