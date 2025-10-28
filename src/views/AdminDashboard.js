import React from 'react';
import Container from 'react-bootstrap/Container';

function AdminDashboard() {
  return (
    <Container className="my-5">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración. Desde aquí puedes gestionar productos, usuarios, etc.</p>
    </Container>
  );
}

export default AdminDashboard;
