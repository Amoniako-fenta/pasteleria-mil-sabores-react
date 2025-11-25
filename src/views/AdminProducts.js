import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Form, Modal, Alert } from 'react-bootstrap';
import { getProducts, createProduct, deleteProduct } from '../services/productService';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Estado para el formulario nuevo
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'tortas-cuadradas',
    description: '',
    imageUrl: ''
  });

  // 1. CARGAR PRODUCTOS AL INICIAR
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // 2. MANEJAR FORMULARIO
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // 3. GUARDAR PRODUCTO (CONECTADO AL BACKEND)
  const handleSave = async () => {
    // Validaciones simples
    if (!newProduct.name || !newProduct.price) {
      setErrorMsg("Nombre y precio son obligatorios");
      return;
    }

    try {
      setErrorMsg("");
      await createProduct(newProduct); // Envía a Spring Boot
      setShowModal(false);
      cargarProductos(); // Recarga la tabla para ver el nuevo
      alert("¡Producto creado con éxito!");
      
      // Limpiar form
      setNewProduct({ name: '', price: '', category: 'tortas-cuadradas', description: '', imageUrl: '' });
    } catch (error) {
      setErrorMsg("Error al guardar en el servidor.");
    }
  };

  // 4. ELIMINAR PRODUCTO
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este pastel?")) {
      try {
        await deleteProduct(id); // Borra en Spring Boot
        cargarProductos(); // Actualiza la tabla
      } catch (error) {
        alert("No se pudo eliminar el producto.");
      }
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos (Backend)</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Nuevo Producto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img src={p.imageUrl} alt="mini" style={{width: '50px', height: '50px', objectFit: 'cover'}} />
              </td>
              <td>{p.name}</td>
              <td>${p.price?.toLocaleString('es-CL')}</td>
              <td>{p.category}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* MODAL PARA CREAR PRODUCTO */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Pastel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="name" onChange={handleChange} value={newProduct.name} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="price" onChange={handleChange} value={newProduct.price} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="category" onChange={handleChange} value={newProduct.category}>
                <option value="tortas-cuadradas">Tortas Cuadradas</option>
                <option value="tortas-circulares">Tortas Circulares</option>
                <option value="vegana">Vegana</option>
                <option value="sin-azucar">Sin Azúcar</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" name="description" onChange={handleChange} value={newProduct.description} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control name="imageUrl" placeholder="https://..." onChange={handleChange} value={newProduct.imageUrl} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar en BD</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminProducts;