import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { currentUser } = useAuth();

  return (
    <Container className="mt-5">
      <div className="mb-4">
        <h2>Panel de Administración</h2>
        <p className="text-muted">
          Bienvenido, <strong>{currentUser?.name || 'Administrador'}</strong>. 
          Aquí tienes el control total de la pastelería.
        </p>
      </div>

      <Row>
        {/* TARJETA DE PRODUCTOS (La que funciona) */}
        <Col md={6} lg={4} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍰</div>
              <Card.Title>Gestión de Productos</Card.Title>
              <Card.Text>
                Agrega nuevos pasteles, edita precios o elimina productos del catálogo.
                Todo conectado a la Base de Datos.
              </Card.Text>
              {/* Este Link te lleva a la pantalla de CRUD que hicimos */}
              <Link to="/admin/productos">
                <Button variant="primary" size="lg" className="w-100">
                  Administrar Productos
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* TARJETA DE USUARIOS (Solo visual por ahora) */}
        <Col md={6} lg={4} className="mb-4">
          <Card className="h-100 shadow-sm border-0 opacity-75" style={{ background: '#f8f9fa' }}>
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👥</div>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>
                Gestión de clientes y roles de administrador.
              </Card.Text>
              <Button variant="secondary" disabled className="w-100">
                Próximamente
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;