import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Tu configuración de Axios

function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  // Estados
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', city: '' });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // --- LÓGICA DE PAGO (INTEGRACIÓN WEBPAY) ---
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Calcular total final
    const shippingCost = deliveryType === 'delivery' ? 3000 : 0;
    const totalToPay = cartTotal + shippingCost;

    try {
      console.log("💰 Iniciando transacción por:", totalToPay);
      
      // 1. Pedir al Backend que cree la transacción
      const response = await api.post('/api/webpay/create', { amount: totalToPay });
      
      // 2. Obtener URL y Token desde tu Backend
      const { url, token } = response.data;
      console.log("Token recibido:", token);

      // 3. Crear formulario invisible para redirigir a Transbank
      // (Webpay requiere enviar el token por POST a su URL)
      const form = document.createElement("form");
      form.action = url;
      form.method = "POST";
      form.style.display = "none";

      const tokenInput = document.createElement("input");
      tokenInput.name = "token_ws";
      tokenInput.value = token;
      
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      
      // 4. Enviar formulario (Redirección automática)
      form.submit();

    } catch (error) {
      console.error("Error al iniciar Webpay:", error);
      alert("Error al conectar con el servicio de pago. Revisa que el Backend esté corriendo.");
      setIsProcessing(false);
    }
  };

  // Validación carrito vacío
  if (cartItems.length === 0) {
    return (
        <Container className="mt-5 text-center">
            <h3>Tu carrito está vacío 🛒</h3>
            <Button variant="primary" onClick={() => navigate('/catalogo')}>Ir al Catálogo</Button>
        </Container>
    );
  }

  const shippingCost = deliveryType === 'delivery' ? 3000 : 0;
  const finalTotal = cartTotal + shippingCost;

  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      <Row>
        <Col md={8}>
          <Card className="p-4 shadow-sm mb-4">
            <h4 className="mb-3">Datos de Entrega</h4>
            <Form onSubmit={handlePayment}>
                
                {/* Tipo de Entrega */}
                <div className="mb-4 border p-3 rounded bg-light">
                    <Form.Check 
                        type="radio" id="pickup" label="🏪 Retiro en Tienda (Gratis)"
                        name="deliveryType" checked={deliveryType === 'pickup'}
                        onChange={() => setDeliveryType('pickup')} className="mb-2 fw-bold"
                    />
                    <Form.Check 
                        type="radio" id="delivery" label="🚚 Despacho a Domicilio (+$3.000)"
                        name="deliveryType" checked={deliveryType === 'delivery'}
                        onChange={() => setDeliveryType('delivery')} className="fw-bold"
                    />
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control required name="name" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control required type="tel" name="phone" onChange={handleInputChange} />
                </Form.Group>

                {deliveryType === 'delivery' && (
                    <div className="animate__animated animate__fadeIn">
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control required name="address" onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comuna</Form.Label>
                            <Form.Control required name="city" onChange={handleInputChange} />
                        </Form.Group>
                    </div>
                )}

                <Button 
                    variant="danger" 
                    size="lg" 
                    type="submit" 
                    className="w-100 mt-3"
                    disabled={isProcessing}
                    style={{ backgroundColor: '#d0021b', borderColor: '#d0021b' }}
                >
                    {isProcessing ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            {' '}Conectando con Webpay...
                        </>
                    ) : (
                        `Pagar $${finalTotal.toLocaleString('es-CL')} con Webpay`
                    )}
                </Button>
            </Form>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">Resumen</Card.Header>
            <ListGroup variant="flush">
                {cartItems.map((item, idx) => (
                    <ListGroup.Item key={idx} className="d-flex justify-content-between">
                        <small>{item.name}</small>
                        <small>${item.price?.toLocaleString('es-CL')}</small>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between fw-bold bg-light fs-5">
                    <span>Total a Pagar</span>
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