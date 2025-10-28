import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Necesario porque Login usa <Link> y useNavigate (indirectamente via useAuth)
import { MemoryRouter } from 'react-router-dom'; 
// Necesario porque Login usa useAuth
import { AuthProvider } from '../context/AuthContext'; 
// El componente a probar
import Login from './Login';

// Mock simple para alert, ya que no funciona bien en el entorno de Jest
global.alert = jest.fn();

describe('Componente Login', () => {
  // Función helper para renderizar el componente con los Providers necesarios
  const renderLogin = () => {
    render(
      // MemoryRouter simula el router de React para que <Link> y useNavigate funcionen
      <MemoryRouter>
        {/* AuthProvider es necesario porque Login usa el hook useAuth */}
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  // Limpiamos los mocks después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Prueba 1: Verificar que los elementos básicos del formulario se renderizan
  test('renderiza el formulario correctamente', () => {
    renderLogin();
    // Busca los campos por su etiqueta asociada (mejor práctica)
    expect(screen.getByLabelText(/Correo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña:/i)).toBeInTheDocument();
    // Busca el botón por su rol y nombre accesible
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    // Verifica que el link para registrarse esté presente
    expect(screen.getByRole('link', { name: /Regístrate aquí/i })).toBeInTheDocument();
  });

  // Prueba 2: Verificar validación de formato de correo (sin @)
  test('muestra error si el correo no tiene @', () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/Correo:/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    // Simula escribir en el input
    fireEvent.change(emailInput, { target: { value: 'correo_invalido' } });
    // Simula el envío del formulario
    fireEvent.click(submitButton);

    // Verifica que aparezca el mensaje de error definido en react-hook-form
    // Usamos expresión regular (/.../i) para ignorar mayúsculas/minúsculas
    expect(screen.getByText(/Correo no válido/i)).toBeInTheDocument();
  });

  // Prueba 3: Verificar validación de dominio de correo
   test('muestra error si el correo no es de dominio permitido', () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/Correo:/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    // Simula escribir un correo con un dominio no permitido
    fireEvent.change(emailInput, { target: { value: 'test@otrodominio.com' } });
    fireEvent.click(submitButton);

    // Verifica el mensaje de error específico para la validación de dominio
    expect(screen.getByText(/Solo correos @duoc\.cl, @profesor\.duoc\.cl o @gmail\.com/i)).toBeInTheDocument();
  });

  // Prueba 4: Verificar validación de longitud mínima de contraseña
  test('muestra error si la contraseña es muy corta', () => {
    renderLogin();
    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    // Simula escribir una contraseña demasiado corta
    fireEvent.change(passwordInput, { target: { value: '123' } }); // Menos de 4 caracteres
    fireEvent.click(submitButton);

    // Verifica el mensaje de error para longitud mínima
    expect(screen.getByText(/Mínimo 4 caracteres/i)).toBeInTheDocument();
  });

  // Prueba 5: Verificar validación de longitud máxima de contraseña
  test('muestra error si la contraseña es muy larga', () => {
    renderLogin();
    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    // Simula escribir una contraseña demasiado larga
    fireEvent.change(passwordInput, { target: { value: '12345678901' } }); // Más de 10 caracteres
    fireEvent.click(submitButton);

    // Verifica el mensaje de error para longitud máxima
    expect(screen.getByText(/Máximo 10 caracteres/i)).toBeInTheDocument();
  });

  // (Opcional - Más Avanzado) Prueba para verificar que se llama a la función 'login' del contexto
  // test('llama a la función login con los datos correctos al enviar un formulario válido', () => {
  //   // Se necesitaría mockear useAuth para espiar la función login
  //   // const mockLogin = jest.fn();
  //   // jest.mock('../context/AuthContext', () => ({
  //   //   ...jest.requireActual('../context/AuthContext'), // Mantener las exportaciones originales
  //   //   useAuth: () => ({ login: mockLogin }), // Sobrescribir useAuth
  //   // }));
    
  //   renderLogin();
  //   const emailInput = screen.getByLabelText(/Correo:/i);
  //   const passwordInput = screen.getByLabelText(/Contraseña:/i);
  //   const submitButton = screen.getByRole('button', { name: /Entrar/i });

  //   fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
  //   fireEvent.click(submitButton);

  //   // expect(mockLogin).toHaveBeenCalledWith('test@gmail.com', 'password123');
  // });
});

