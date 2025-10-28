import React from 'react';
// 1. Importa los componentes de layout de react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Nosotros() {
  return (
    // 2. Usa <Container> para centrar el contenido y añadir márgenes laterales
    <Container className="my-5"> {/* my-5 añade margen vertical */}
      
      {/* Sección de Historia */}
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}> {/* Limita el ancho del texto para mejor legibilidad */}
          {/* Mantenemos tus títulos y párrafos, Bootstrap ayuda a centrarlos */}
          <h1>Nuestra historia</h1>
          <p className="lead"> {/* lead hace el texto un poco más grande */}
            Somos un referente en la repostería chilena, reconocidos por nuestra participación 
            en un récord Guinness en 1995, cuando colaboramos en la creación de la 
            torta más grande del mundo.
          </p>
        </Col>
      </Row>

      {/* Sección de Misión y Visión */}
      {/* 3. Usa Row y Col para crear una estructura de dos columnas en pantallas medianas y grandes */}
      <Row className="mision-vision text-center">
        <Col md={6} className="mb-4"> {/* mb-4 añade margen inferior en móviles */}
          <h2>Misión</h2>
          <p>
            Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y 
            productos de repostería de alta calidad para todas las ocasiones.
          </p>
          
        </Col>
        <Col md={6}>
          <h2>Visión</h2>
          <p>
            Convertirnos en la tienda online líder de productos de repostería en Chile, reconocida por 
            nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente en la 
            formación de nuevos talentos en gastronomía.
          </p>
          
        </Col>
      </Row>
      
    </Container>
  );
}

export default Nosotros;

