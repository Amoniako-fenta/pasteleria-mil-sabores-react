import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Necesario porque Register usa useNavigate
import { MemoryRouter, useNavigate } from 'react-router-dom'; 
// Importamos el componente a probar
import Register from './Register';

// -- Mocking --
// Mock simple para alert
global.alert = jest.fn();

// Mock para localStorage.setItem (para verificar si se guarda)
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

// Mock para useNavigate (para verificar la redirección)
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'), // usa las exportaciones originales
//   useNavigate: jest.fn(), // pero sobrescribe useNavigate con un mock
// }));
// const mockNavigate = jest.fn(); // Mock function para useNavigate
// useNavigate.mockReturnValue(mockNavigate); // Asigna el mock


describe('Componente Register', () => {

  // Función helper para renderizar el componente con MemoryRouter
  const renderRegister = () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  };

  // Limpiar mocks después de cada prueba
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Prueba 1: Renderizado inicial
  test('renderiza el formulario de registro correctamente', () => {
    renderRegister();
    expect(screen.getByLabelText(/Nombre:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edad:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Código de descuento:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  // Prueba 2: Validación de campos requeridos (ejemplo con Nombre y Correo)
  test('muestra errores si los campos requeridos están vacíos al enviar', async () => {
    renderRegister();
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });

    fireEvent.click(submitButton);

    // Espera a que aparezcan los mensajes de error (pueden ser asíncronos)
    // Usamos findByText para esperar
    expect(await screen.findByText(/El nombre es requerido/i)).toBeInTheDocument();
    expect(await screen.findByText(/El correo es requerido/i)).toBeInTheDocument();
    expect(await screen.findByText(/La contraseña es requerida/i)).toBeInTheDocument();
    expect(await screen.findByText(/La edad es requerida/i)).toBeInTheDocument();
  });

  // Prueba 3: Validación de formato de correo (dominio incorrecto)
  test('muestra error si el correo no tiene un dominio permitido', async () => {
    renderRegister();
    const emailInput = screen.getByLabelText(/Correo:/i);
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });

    fireEvent.change(emailInput, { target: { value: 'test@dominioinvalido.com' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Solo correos @duoc\.cl, @profesor\.duoc\.cl o @gmail\.com/i)).toBeInTheDocument();
  });

   // Prueba 4: Validación de longitud mínima de contraseña
   test('muestra error si la contraseña es muy corta', async () => {
    renderRegister();
    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });

    fireEvent.change(passwordInput, { target: { value: '123' } }); // Menos de 4
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Mínimo 4 caracteres/i)).toBeInTheDocument();
  });

   // Prueba 5: Validación de edad mínima
   test('muestra error si la edad no es válida', async () => {
    renderRegister();
    const ageInput = screen.getByLabelText(/Edad:/i);
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });

    fireEvent.change(ageInput, { target: { value: '0' } }); // Menos de 1
    fireEvent.click(submitButton);

    expect(await screen.findByText(/La edad debe ser válida/i)).toBeInTheDocument();
  });

  // Prueba 6: Envío exitoso (simplificado)
  test('guarda en localStorage y muestra alerta al enviar formulario válido', async () => {
    renderRegister();

    // Rellena el formulario con datos válidos
    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Usuario Test' } });
    fireEvent.change(screen.getByLabelText(/Correo:/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/Edad:/i), { target: { value: '30' } });
    
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    fireEvent.click(submitButton);

    // Espera a que las validaciones asíncronas terminen y se procese el submit
    // Usamos waitFor para verificar efectos secundarios como localStorage y alert
    await waitFor(() => {
      // Verifica que se intentó guardar en localStorage con la clave correcta (email)
      expect(setItemSpy).toHaveBeenCalledWith('test@gmail.com', 'password');
      // Verifica que la alerta se mostró (con cualquier mensaje que contenga "Bienvenido")
      expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Bienvenido Usuario Test'));
       // Verifica que se intentó navegar (si el mock de useNavigate estuviera activo)
      // expect(mockNavigate).toHaveBeenCalledWith('/login'); 
    });
  });

  // Prueba 7: Verifica beneficio por edad >= 50
  test('muestra beneficio de edad en alerta para usuarios mayores de 50', async () => {
      renderRegister();
      fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Mayor Test' } });
      fireEvent.change(screen.getByLabelText(/Correo:/i), { target: { value: 'mayor@gmail.com' } });
      fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password' } });
      fireEvent.change(screen.getByLabelText(/Edad:/i), { target: { value: '55' } }); // Edad >= 50
      
      fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

      await waitFor(() => {
          expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Obtienes 50% de descuento'));
      });
  });

  // Prueba 8: Verifica beneficio por código FELICES50
  test('muestra beneficio de código en alerta si se ingresa FELICES50', async () => {
      renderRegister();
      fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Codigo Test' } });
      fireEvent.change(screen.getByLabelText(/Correo:/i), { target: { value: 'codigo@gmail.com' } });
      fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password' } });
      fireEvent.change(screen.getByLabelText(/Edad:/i), { target: { value: '25' } });
      fireEvent.change(screen.getByLabelText(/Código de descuento:/i), { target: { value: 'FELICES50' } }); // Código correcto
      
      fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

      await waitFor(() => {
          expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Obtienes 10% de descuento de por vida'));
      });
  });

  // Prueba 9: Verifica beneficio por correo Duoc
  test('muestra beneficio Duoc en alerta si el correo termina en @duocuc.cl', async () => {
      renderRegister();
      fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Duoc Test' } });
      // ¡OJO! Usa el dominio exacto que tienes en tu lógica de Register.js (@duocuc.cl)
      fireEvent.change(screen.getByLabelText(/Correo:/i), { target: { value: 'estudiante@duocuc.cl' } }); 
      fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password' } });
      fireEvent.change(screen.getByLabelText(/Edad:/i), { target: { value: '20' } });
      
      fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

      await waitFor(() => {
          expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Torta GRATIS en tu cumpleaños por ser estudiante DUOC'));
      });
  });


});
