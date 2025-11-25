import React from 'react';
import { Offcanvas, Button, ListGroup, Image } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartModal() {
  // Consumimos el estado 'isOpen' y la función 'closeCart' del contexto
  const { 
    isOpen, 
    closeCart, 
    cartItems, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  const navigate = useNavigate();

  const total = cartTotal || cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    closeCart(); 
    navigate('/checkout');
  };

  return (
    // La propiedad 'show' es la que controla si se ve o no, basada en 'isOpen'
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>🛒 Tu Carrito</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="d-flex flex-column">
        {cartItems.length === 0 ? (
          <div className="text-center my-auto text-muted">
            <div style={{ fontSize: '4rem' }}>🛍️</div>
            <p className="mt-3">Tu carrito está vacío</p>
            <Button variant="outline-primary" onClick={closeCart}>
              Ir a comprar
            </Button>
          </div>
        ) : (
          <>
            <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <Image 
                      src={item.imageUrl} 
                      rounded 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                      onError={(e) => { e.target.src = "https://placehold.co/50"; }}
                    />
                    <div>
                      <div className="fw-bold">{item.name}</div>
                      <div className="text-muted small">${item.price?.toLocaleString('es-CL')}</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeFromCart(item)}
                    style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}
                  >
                    ×
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="border-top pt-3 mt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Total:</h5>
                <h4 className="mb-0 text-primary fw-bold">
                  ${total.toLocaleString('es-CL')}
                </h4>
              </div>
              <Button variant="success" size="lg" className="w-100 mb-2" onClick={handleCheckout}>
                Pagar Ahora 💳
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartModal;