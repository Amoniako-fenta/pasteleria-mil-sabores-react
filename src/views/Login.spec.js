    // --- ¡ADVERTENCIA! Este código requiere configuración manual ---
    // --- de Karma, Jasmine, Enzyme y adaptadores. ---
    import React from 'react';
    import { mount } from 'enzyme'; // Se usa Enzyme en lugar de RTL
    import { MemoryRouter } from 'react-router-dom';
    import { AuthProvider } from '../context/AuthContext';
    import Login from './Login'; // El componente a probar

    // Describe (igual que Jest)
    describe('Componente Login (Sintaxis Jasmine/Enzyme)', () => {
      let wrapper; // Para guardar el componente montado
      let emailInput, passwordInput, submitButton;

      // beforeEach (igual que Jest)
      beforeEach(() => {
        // Montamos el componente usando Enzyme
        wrapper = mount(
          <MemoryRouter>
            <AuthProvider>
              <Login />
            </AuthProvider>
          </MemoryRouter>
        );
        // Encontramos elementos usando selectores tipo CSS con Enzyme
        emailInput = wrapper.find('input#loginEmail');
        passwordInput = wrapper.find('input#loginPassword');
        submitButton = wrapper.find('button[type="submit"]');
      });

      // it (igual que Jest test)
      it('debería renderizar el formulario correctamente', () => {
        // expect (igual) pero los matchers son de Jasmine/Enzyme
        expect(emailInput.exists()).toBe(true);
        expect(passwordInput.exists()).toBe(true);
        expect(submitButton.exists()).toBe(true);
        expect(wrapper.find('a[href="/registro"]').exists()).toBe(true);
      });

      it('debería mostrar error si el correo no tiene @', () => {
        // simulate de Enzyme reemplaza a fireEvent
        emailInput.simulate('change', { target: { value: 'correo_invalido' } });
        // Para formularios, a veces necesitas simular el 'submit' en el <form>
        wrapper.find('form').simulate('submit'); 
        // Actualizar el wrapper para ver los cambios
        wrapper.update(); 
        // Buscar el mensaje de error y verificar su texto
        const errorMessage = wrapper.find('.error-message').first(); // Busca la clase del error
        expect(errorMessage.text()).toContain('Correo no válido'); // Matcher de Jasmine
      });

      it('debería mostrar error si el correo no es de dominio permitido', () => {
        emailInput.simulate('change', { target: { value: 'test@otrodominio.com' } });
        wrapper.find('form').simulate('submit');
        wrapper.update();
        const errorMessage = wrapper.find('.error-message').first();
        expect(errorMessage.text()).toContain('Solo correos @duoc.cl'); 
      });

       it('debería mostrar error si la contraseña es muy corta', () => {
        passwordInput.simulate('change', { target: { value: '123' } });
        wrapper.find('form').simulate('submit');
        wrapper.update();
        // Encuentra el error asociado al input de contraseña
        const errorMessage = passwordInput.closest('.field').find('.error-message');
        expect(errorMessage.text()).toContain('Mínimo 4 caracteres');
      });

      // ... (Otras pruebas de validación similar)

    });
