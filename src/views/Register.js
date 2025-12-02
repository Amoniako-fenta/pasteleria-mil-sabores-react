import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { registerUser } = useAuth(); // Usamos la función del contexto
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError("");
    // Llamamos al backend
    const result = await registerUser(data.name, data.email, data.password);

    if (result.success) {
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate('/login'); // Redirigimos al login para que entre
    } else {
      setServerError(result.message); // Mostramos el error (ej: email repetido)
    }
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card style={{ width: '400px' }} className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Crear Cuenta</h2>
          
          {serverError && <Alert variant="danger">{serverError}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control 
                {...register("name", { required: "El nombre es obligatorio" })} 
                placeholder="Ej: Juan Pérez"
              />
              {errors.name && <span className="text-danger small">{errors.name.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control 
                type="email"
                {...register("email", { 
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Correo inválido"
                  }
                })} 
                placeholder="tu@correo.com"
              />
              {errors.email && <span className="text-danger small">{errors.email.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password"
                {...register("password", { 
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" }
                })} 
              />
              {errors.password && <span className="text-danger small">{errors.password.message}</span>}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control 
                type="password"
                {...register("confirmPassword", { 
                  required: "Confirma tu contraseña",
                  validate: (val) => {
                    if (watch('password') !== val) {
                      return "Las contraseñas no coinciden";
                    }
                  }
                })} 
              />
              {errors.confirmPassword && <span className="text-danger small">{errors.confirmPassword.message}</span>}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;