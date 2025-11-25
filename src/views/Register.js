import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^\S+@(\duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, email, password, age, code } = data;
    let beneficio = `¡Bienvenido ${name}!`;
    if (age >= 50) {
      beneficio += "\nObtienes 50% de descuento en todos los productos.";
    }
    if (code && code.toUpperCase() === "FELICES50") {
      beneficio += "\nObtienes 10% de descuento de por vida.";
    }
    if (email.endsWith("@duocuc.cl")) {
      beneficio += "\nTorta GRATIS en tu cumpleaños por ser estudiante DUOC.";
    }
    localStorage.setItem(email, password);
    alert(beneficio + "\nRegistro exitoso. Ya puedes iniciar sesión.");
    navigate('/login');
  };

  return (
    <main className="auth">
      <h2>Registro de Usuario</h2>
      <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
        
        {/* FIX: Cada campo está envuelto en un div.field */}
        <div className="field">
          <label htmlFor="name">Nombre:</label>
          <input 
            type="text" 
            id="name" 
            {...register("name", { 
              required: "El nombre es requerido",
              maxLength: { value: 100, message: "Máximo 100 caracteres" }
            })} 
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="direction">Dirección:</label>
          <input 
            type="text" 
            id="direction"
            {...register("direction")}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Correo:</label>
          <input 
            type="email" 
            id="email" 
            {...register("email", { 
              required: "El correo es requerido",
              maxLength: { value: 100, message: "Máximo 100 caracteres" },
              pattern: {
                value: emailRegex,
                message: "Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com"
              }
            })} 
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            {...register("password", { 
              required: "La contraseña es requerida",
              minLength: { value: 4, message: "Mínimo 4 caracteres" },
              maxLength: { value: 10, message: "Máximo 10 caracteres" }
            })} 
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="age">Edad:</label>
          <input 
            type="number" 
            id="age" 
            {...register("age", { 
              required: "La edad es requerida",
              min: { value: 1, message: "La edad debe ser válida" },
              valueAsNumber: true
            })} 
          />
          {errors.age && <span className="error-message">{errors.age.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="code">Código de descuento:</label>
          <input 
            type="text" 
            id="code" 
            placeholder="Opcional"
            {...register("code")} 
          />
        </div>
        
        <div className="actions">
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </div>
      </form>
    </main>
  );
}

export default Register;
