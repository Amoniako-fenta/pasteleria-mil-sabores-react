import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { products as initialProducts } from '../data/products'; // Importa los productos

function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      alert('Producto eliminado (simulación)');
    }
  };

  return (
    <Container className="my-5">
      <h1>Gestión de Productos</h1>
      <p>Aquí puedes ver, editar o eliminar productos.</p>
      <Button variant="success" className="mb-3">Añadir Nuevo Producto (Simulado)</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toLocaleString('es-CL')}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Editar (Simulado)</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminProducts;
