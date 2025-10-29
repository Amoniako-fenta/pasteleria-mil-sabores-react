// --- ¡ADVERTENCIA! Este código requiere configuración manual ---
// --- de Karma, Jasmine, Enzyme y adaptadores. ---
import React from 'react';
import { mount } from 'enzyme'; // Usaremos mount para renderizar la app completa

// Necesitamos BrowserRouter aquí porque App.js ya no lo incluye
import { BrowserRouter } from 'react-router-dom';

// Importamos los Providers necesarios
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Importamos el componente principal a probar
import App from './App';

// Importamos algunos componentes hijos para verificar su existencia
import Navbar from './components/Navbar';
import Home from './views/Home'; // Para verificar la ruta inicial

describe('Componente App (Sintaxis Jasmine/Enzyme)', () => {
  let wrapper; // Variable para guardar el componente montado

  // Montamos la aplicación completa antes de cada prueba
  beforeEach(() => {
    wrapper = mount(
      // Envolvemos App con todos los Providers necesarios y el Router
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  });

  // Prueba 1: Verificar que los componentes principales se renderizan
  it('debería renderizar el Navbar y el Footer', () => {
    // Usamos find() de Enzyme para buscar componentes por su nombre
    expect(wrapper.find(Navbar).exists()).toBe(true);
    // Asumiendo que tienes un componente Footer importado y usado en App.js
    // import Footer from './components/Footer'; // <- Deberías tener esto en App.js
    // expect(wrapper.find(Footer).exists()).toBe(true); // Descomentar si tienes Footer
  });

  // Prueba 2: Verificar que la ruta inicial ("/") renderiza el componente Home
  it('debería renderizar el componente Home en la ruta inicial', () => {
    // Verifica que el componente Home exista dentro del wrapper
    // (Enzyme renderiza todo el árbol, por lo que Home debería estar presente)
    expect(wrapper.find(Home).exists()).toBe(true);
  });

  // Prueba 3 (Conceptual): Simular navegación
  // La simulación de navegación con MemoryRouter en Enzyme es más compleja
  // que con RTL y requiere configuración adicional o librerías específicas.
  // it('debería renderizar el componente Login al navegar a /login', () => {
  //   // Necesitarías una forma de simular el cambio de URL o usar MemoryRouter
  //   // de forma más avanzada con Enzyme.
  //   // wrapper.setProps({ initialEntries: ['/login'] }); // Ejemplo conceptual
  //   // wrapper.update();
  //   // expect(wrapper.find(Login).exists()).toBe(true);
  //   expect(true).toBe(true); // Placeholder
  // });

});


