import React from 'react';
import { useForm } from 'react-hook-form';

// Esta es la RegEx que valida ESOS TRES dominios de correo
const emailRegex = /^\S+@(\duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Login exitoso", data);
    // Aquí iría la lógica de inicio de sesión
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Inicio de Sesión</h4>
      
      <div>
        <label>Correo:</label>
        <input 
          {...register("email", { 
            required: "El correo es requerido",
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
            pattern: {
              value: emailRegex,
              message: "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com"
            }
          })} 
          placeholder="tu-correo@duoc.cl"
        />
        {/* Muestra el error de validación */}
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Contraseña:</label>
        <input 
          type="password"
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: { value: 4, message: "Mínimo 4 caracteres" },
            maxLength: { value: 10, message: "Máximo 10 caracteres" }
          })}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;
