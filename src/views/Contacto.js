import React from 'react';
import { useForm } from 'react-hook-form';

// VALIDACIÓN: Requerimientos del brief y del HTML
const emailRegex = /^\S+@(\duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
const phoneRegex = /^\+?\d{8,15}$/; // Tomado de tu HTML

function Contacto() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Reemplaza la lógica de validate.js
  const onSubmit = (data) => {
    // Si la validación pasa, 'data' contiene todo
    console.log("Formulario de contacto enviado:", data);
    alert("¡Gracias por tu mensaje! Te responderemos pronto.");
    // Aquí podrías resetear el form o redirigir
  };

  return (
    // Usamos un Fragmento (<>) para agrupar los elementos
    <>
      <main id="main">
        <header className="page-header">
          <h1>Hablemos</h1>
          <p>Déjanos tus datos y responderemos tus consultas o pedidos lo antes posible.</p>
        </header>

        {/* Reemplazamos el script 'validate.js' con react-hook-form */}
        <form id="form-contacto" className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <div className="field">
            <label htmlFor="nombre">Nombre y apellido</label>
            <input 
              id="nombre" 
              type="text" 
              autoComplete="name" 
              aria-invalid={errors.nombre ? "true" : "false"}
              {...register("nombre", {
                required: "Tu nombre es requerido",
                minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                maxLength: { value: 100, message: "Máximo 100 caracteres" }
              })} 
            />
            <small className="hint">Ej: Ana Pérez</small>
            {errors.nombre && <p className="error" aria-live="polite">{errors.nombre.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="email">Correo</label>
            <input 
              id="email" 
              type="email" 
              autoComplete="email" 
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Tu correo es requerido",
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
                pattern: {
                  value: emailRegex,
                  message: "Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com"
                }
              })} 
            />
            <small className="hint">Usaremos este correo para responderte.</small>
            {errors.email && <p className="error" aria-live="polite">{errors.email.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="telefono">Teléfono</label>
            <input 
              id="telefono" 
              type="tel" 
              autoComplete="tel" 
              aria-invalid={errors.telefono ? "true" : "false"}
              {...register("telefono", {
                pattern: {
                  value: phoneRegex,
                  message: "Formato no válido (ej: +56912345678)"
                }
                // No lo marqué como 'required' ya que tu brief no lo pedía
              })} 
            />
            <small className="hint">Solo números, puede incluir +56</small>
            {errors.telefono && <p className="error" aria-live="polite">{errors.telefono.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="tipo">Tipo de pedido</label>
            <select 
              id="tipo" 
              aria-invalid={errors.tipo ? "true" : "false"}
              {...register("tipo", { required: "Debes seleccionar una opción" })}
            >
              <option value="">Selecciona una opción</option>
              <option>Torta personalizada</option>
              <option>Pasteles</option>
              <option>Evento corporativo</option>
            </select>
            {errors.tipo && <p className="error" aria-live="polite">{errors.tipo.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="fecha">Fecha deseada</label>
            <input 
              id="fecha" 
              type="date" 
              aria-invalid={errors.fecha ? "true" : "false"}
              {...register("fecha", { required: "La fecha es requerida" })} 
            />
            {errors.fecha && <p className="error" aria-live="polite">{errors.fecha.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="mensaje">Detalles</label>
            <textarea 
              id="mensaje" 
              rows="5" 
              aria-invalid={errors.mensaje ? "true" : "false"}
              {...register("mensaje", {
                required: "El mensaje es requerido",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
                maxLength: { value: 500, message: "Máximo 500 caracteres" }
              })}
            ></textarea>
            {errors.mensaje && <p className="error" aria-live="polite">{errors.mensaje.message}</p>}
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary">Enviar</button>
            <button type="reset" className="btn btn-secondary">Limpiar</button>
          </div>
        </form>

        <section className="info-contacto">
          {/* Tu HTML de info-contacto (Teléfono, Correo, etc.) va aquí sin cambios */}
          <article>
            <h3>Teléfono</h3>
            <p><a href="tel:+56912345678">+56 9 1234 5678</a></p>
          </article>
          <article>
            <h3>Correo Electrónico</h3>
            <p><a href="mailto:contacto@milsabores.cl">contacto@milsabores.cl</a></p>
          </article>
          <article>
            <h3>Visítanos</h3>
            <p>ABlanco Encalada 1335, Renca, Santiago, Chile</p>
            <p>Lun–Sáb 9:00–19:00</p>
          </article>
          <article>
            <h3>Síguenos</h3>
            <p>Instagram: @PASTELERIA_MIL_SABORES_INC</p>
            <p>Facebook: @PASTELERIA_MIL_SABORES</p>
            <p>TikTok: @PASTELERIA_MIL_CHISPOT</p>
          </article>
        </section>
      </main>
    </>
  );
}

export default Contacto;
