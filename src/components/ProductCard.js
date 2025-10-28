import React from 'react';
import { useCart } from '../context/CartContext'; // Importa el hook del carrito

// Importa los componentes específicos de react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/**
 * Componente ProductCard
 * Muestra una tarjeta de producto usando componentes de react-bootstrap.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.product - El objeto del producto a mostrar.
 */
function ProductCard({ product }) {
  // Obtiene la función addToCart del contexto del carrito
  const { addToCart } = useCart();

  // Función para manejar el clic en el botón de añadir
  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} ha sido añadido al carrito!`);
  };

  return (
    // Usa el componente <Card> de react-bootstrap
    // 'h-100' (height: 100%) y 'd-flex' son clases de Bootstrap 
    // que fuerzan a todas las tarjetas a tener la misma altura.
    <Card className="h-100 d-flex flex-column">
      
      {/* Usa <Card.Img> y la clase CSS que definimos para la altura */}
      <Card.Img 
        variant="top" 
        src={product.img} 
        alt={product.name} 
        className="product-card-img" 
      />
      
      {/* <Card.Body> también usa flexbox para alinear el botón al fondo */}
      <Card.Body className="d-flex flex-column">
        
        {/* Usamos los sub-componentes de Card */}
        <Card.Title as="h2">{product.name}</Card.Title>
        
        <Card.Text as="p" className="precio">
          ${product.price.toLocaleString('es-CL')}
        </Card.Text>

        {/* 'flex-grow-1' es la clase clave que empuja el botón hacia abajo */}
        <Card.Text as="p" className="descripcion flex-grow-1">
          {product.description}
        </Card.Text>

        {/* Usa el componente <Button> de react-bootstrap.
          Tu 'styles.css' ya se encarga de que 'variant="primary"' 
          se vea color chocolate y no azul.
        */}
        <Button variant="primary" onClick={handleAddToCart}>
          Añadir al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;


