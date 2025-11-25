import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Estado para el tipo de entrega (pickup = retiro, delivery = despacho)
  const [deliveryType, setDeliveryType] = useState('pickup');
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí podrías enviar 'cartItems' y 'formData' a tu Backend Spring Boot
    // await createOrder({ items: cartItems, ...formData });

    // Simulamos éxito
    alert("✅ ¡Compra realizada con éxito! Gracias por tu preferencia.");
    clearCart(); // Limpiamos el carrito
    navigate('/'); // Volvemos al inicio
  };

  // Si no hay ítems, volver al catálogo
  if (cartItems.length === 0) {
    return (
        <Container className="mt-5 text-center">
            <h3>Tu carrito está vacío 🛒</h3>
            <Button variant="primary" onClick={() => navigate('/catalogo')}>Ir al Catálogo</Button>
        </Container>
    );
  }

  // Costo de envío fijo (ejemplo)
  const shippingCost = deliveryType === 'delivery' ? 3000 : 0;
  const finalTotal = cartTotal + shippingCost;

  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      <Row>
        {/* COLUMNA IZQUIERDA: Formulario */}
        <Col md={8}>
          <Card className="p-4 shadow-sm mb-4">
            <h4 className="mb-3">Datos de Entrega</h4>
            <Form onSubmit={handleSubmit}>
                
                {/* Selección de Tipo de Entrega */}
                <div className="mb-4 border p-3 rounded bg-light">
                    <Form.Check 
                        type="radio"
                        id="pickup"
                        label="🏪 Retiro en Tienda (Gratis)"
                        name="deliveryType"
                        checked={deliveryType === 'pickup'}
                        onChange={() => setDeliveryType('pickup')}
                        className="mb-2 fw-bold"
                    />
                    <Form.Check 
                        type="radio"
                        id="delivery"
                        label="🚚 Despacho a Domicilio (+$3.000)"
                        name="deliveryType"
                        checked={deliveryType === 'delivery'}
                        onChange={() => setDeliveryType('delivery')}
                        className="fw-bold"
                    />
                </div>

                {/* Campos del Formulario */}
                <Form.Group className="mb-3">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control required name="name" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control required type="tel" name="phone" onChange={handleInputChange} placeholder="+56 9..." />
                </Form.Group>

                {/* Solo mostrar dirección si es Despacho */}
                {deliveryType === 'delivery' && (
                    <div className="animate__animated animate__fadeIn">
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección de Envío</Form.Label>
                            <Form.Control required name="address" onChange={handleInputChange} placeholder="Calle, Número, Depto" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comuna</Form.Label>
                            <Form.Control required name="city" onChange={handleInputChange} />
                        </Form.Group>
                    </div>
                )}

                {deliveryType === 'pickup' && (
                    <div className="alert alert-info">
                        📍 Dirección de retiro: <strong>Av. Concha y Toro 123, Puente Alto.</strong><br/>
                        Horario: Lunes a Viernes de 09:00 a 18:00 hrs.
                    </div>
                )}

                <Button variant="success" size="lg" type="submit" className="w-100 mt-3">
                    Confirmar Pago (${finalTotal.toLocaleString('es-CL')})
                </Button>
            </Form>
          </Card>
        </Col>

        {/* COLUMNA DERECHA: Resumen */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">Resumen de la Orden</Card.Header>
            <ListGroup variant="flush">
                {cartItems.map((item, idx) => (
                    <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                        <div>
                            <small className="fw-bold">{item.name}</small>
                        </div>
                        <small>${item.price?.toLocaleString('es-CL')}</small>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                    <span>Subtotal</span>
                    <span>${cartTotal.toLocaleString('es-CL')}</span>
                </ListGroup.Item>
                {deliveryType === 'delivery' && (
                    <ListGroup.Item className="d-flex justify-content-between text-muted">
                        <span>Envío</span>
                        <span>$3.000</span>
                    </ListGroup.Item>
                )}
                <ListGroup.Item className="d-flex justify-content-between fw-bold bg-light" style={{fontSize: '1.2rem'}}>
                    <span>Total</span>
                    <span>${finalTotal.toLocaleString('es-CL')}</span>
                </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;