import React from 'react';
import { useCart } from '../context/CartContext'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/**
 * Componente ProductCard
 */
function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} ha sido añadido al carrito!`);
  };

  return (
    <Card className="h-100 d-flex flex-column">
      
      {/* --- CORRECCIÓN AQUÍ --- */}
      <Card.Img 
        variant="top" 
        src={product.imageUrl}  // <--- CAMBIO CLAVE: imageUrl (igual que en Java)
        alt={product.name} 
        className="product-card-img"
        // Esto pone una imagen de reemplazo si el link original falla
        onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Imagen+No+Disponible"; }}
      />
      
      <Card.Body className="d-flex flex-column">
        
        <Card.Title as="h2">{product.name}</Card.Title>
        
        <Card.Text as="p" className="precio">
          {/* El ?. ayuda a que no falle si el precio tarda en llegar */}
          ${product.price?.toLocaleString('es-CL')}
        </Card.Text>

        <Card.Text as="p" className="descripcion flex-grow-1">
          {product.description}
        </Card.Text>

        <Button variant="primary" onClick={handleAddToCart}>
          Añadir al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;