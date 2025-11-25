import React, { useState, useMemo, useEffect } from 'react';
// ELIMINADO: import { products } from '../data/products'; 
import { getProducts } from '../services/productService'; // NUEVO: Importamos el servicio
import ProductCard from '../components/ProductCard'; 

// Define las categorías para los botones de filtro
// NOTA IMPORTANTE: Asegúrate de que en tu Base de Datos la columna 'category'
// coincida con estos IDs (ej: 'tortas-cuadradas'). Si en BD guardaste "Tortas",
// tendrás que cambiar estos IDs aquí o el dato en la BD.
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
  // 1. ESTADO: 
  // activeFilter: Guarda la categoría activa.
  const [activeFilter, setActiveFilter] = useState('all');
  
  // NUEVO: products guarda los datos que vienen del Backend
  const [products, setProducts] = useState([]);
  
  // NUEVO: loading controla si mostramos el mensaje de carga
  const [loading, setLoading] = useState(true);

  // 2. EFECTO DE CARGA (Conexión con Backend)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // Llamada al servicio
        setProducts(data); // Guardamos los pasteles del backend
        setLoading(false); // Terminó de cargar
      } catch (error) {
        console.error("Error cargando productos:", error);
        setLoading(false); // Quitamos el loading aunque falle para no bloquear
      }
    };

    fetchProducts();
  }, []); // [] significa que se ejecuta una sola vez al montar

  // 3. LÓGICA DE FILTRADO
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return products; 
    }
    // Filtra comparando la categoría del backend con el filtro activo
    return products.filter(product => product.category === activeFilter);
  }, [activeFilter, products]); // Agregamos 'products' a las dependencias

  // 4. RENDERIZADO
  return (
    <>
      <header className="page-header">
        <h1>Catálogo de Productos</h1>
        <p>Selecciona una categoría para ver los productos disponibles.</p>
        <div className="filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`chip ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>

      {/* Mensaje de carga mientras esperamos al backend */}
      {loading ? (
        <div className="text-center py-5">
            <h2>Cargando productos desde el horno... 🧁</h2>
        </div>
      ) : (
        <section className="grid productos">
          {filteredProducts.length > 0 ? (
             filteredProducts.map(product => (
               <ProductCard key={product.id} product={product} />
             ))
          ) : (
             <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
                <p>No se encontraron productos en esta categoría (o el backend está vacío).</p>
             </div>
          )}
        </section>
      )}
      
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
            <strong> Escuela de Administración y Negocios</strong>, quienes participan en la elaboración
            y perfeccionamiento de nuestras recetas.
          </p>
      </section>
    </>
  );
}

export default Catalogo;