import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos tu contexto

// ACTUALICÉ LA REGEX: Agregué '|milsabores\.com' para que te deje entrar con el admin
const emailRegex = /^\S+@(\duoc\.cl|profesor\.duoc\.cl|gmail\.com|milsabores\.com)$/i;

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth(); // Sacamos la función login del contexto
  const navigate = useNavigate(); // Para redirigir al Home
  
  // Estado para errores de servidor (ej: "Credenciales incorrectas")
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError(""); // Limpiar errores previos

    // Llamamos a la función login que conecta con Spring Boot
    const result = await login(data.email, data.password);

    if (result.success) {
      console.log("Login exitoso con Backend");
      navigate('/'); // Redirigir al Home o Catálogo
    } else {
      // Si falla (contraseña mal o error de conexión), mostramos el mensaje
      setServerError("Error: Credenciales incorrectas o falla de conexión.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h4 style={{ textAlign: 'center' }}>Inicio de Sesión</h4>
        
        {/* Mensaje de error del Backend */}
        {serverError && (
          <div className="alert alert-danger" style={{ fontSize: '0.9rem', padding: '10px', color: 'red', textAlign: 'center' }}>
            {serverError}
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label>Correo:</label>
          <input 
            className="form-control" // Clase de Bootstrap si la tienes
            {...register("email", { 
              required: "El correo es requerido",
              maxLength: { value: 100, message: "Máximo 100 caracteres" },
              pattern: {
                value: emailRegex,
                message: "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl, @gmail.com o @milsabores.com"
              }
            })} 
            placeholder="admin@milsabores.com"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Contraseña:</label>
          <input 
            type="password"
            className="form-control"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: { value: 4, message: "Mínimo 4 caracteres" },
              maxLength: { value: 20, message: "Máximo 20 caracteres" }
            })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password.message}</p>}
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" // Clase de Bootstrap
          style={{ width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;