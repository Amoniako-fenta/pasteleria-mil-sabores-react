// --- ¡ADVERTENCIA! Este código requiere configuración manual ---
// --- de Karma, Jasmine, Enzyme y adaptadores. ---
import React from 'react';
import { mount } from 'enzyme'; // Usaremos mount para interactuar con el formulario
import { MemoryRouter } from 'react-router-dom'; // Necesario por useNavigate
import Register from './Register'; // El componente a probar

// Mock simple para alert (Jasmine no lo necesita por defecto, pero es útil)
// global.alert = jasmine.createSpy('alertSpy');
// Mock para localStorage (Usando spyOn de Jasmine)
// spyOn(Storage.prototype, 'setItem').and.callThrough(); // 'spyOn' es de Jasmine

describe('Componente Register (Sintaxis Jasmine/Enzyme)', () => {
  let wrapper;
  let nameInput, emailInput, passwordInput, ageInput, codeInput, submitButton;

  // beforeEach se ejecuta antes de cada prueba 'it'
  beforeEach(() => {
    // Montamos el componente completo con Enzyme
    wrapper = mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    // Encontramos los elementos usando selectores tipo CSS
    nameInput = wrapper.find('input#name');
    emailInput = wrapper.find('input#email');
    passwordInput = wrapper.find('input#password');
    ageInput = wrapper.find('input#age');
    codeInput = wrapper.find('input#code');
    submitButton = wrapper.find('button[type="submit"]');
  });

  // Limpiar spies después de cada prueba si los usas
  // afterEach(() => {
  //   if (Storage.prototype.setItem.calls) {
  //      Storage.prototype.setItem.calls.reset(); // Resetea el spy de localStorage
  //   }
  //   if (global.alert && global.alert.calls) {
  //      global.alert.calls.reset(); // Resetea el spy de alert
  //   }
  // });

  it('debería renderizar el formulario correctamente', () => {
    expect(nameInput.exists()).toBe(true);
    expect(emailInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
    expect(ageInput.exists()).toBe(true);
    expect(codeInput.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
  });

  it('debería mostrar errores si los campos requeridos están vacíos', () => {
    // Simula el envío del formulario
    wrapper.find('form').simulate('submit');
    // Forzar actualización para ver los cambios en el DOM simulado
    wrapper.update();

    // Buscar los mensajes de error asociados a cada campo
    const nameError = nameInput.closest('.field').find('.error-message');
    const emailError = emailInput.closest('.field').find('.error-message');
    const passwordError = passwordInput.closest('.field').find('.error-message');
    const ageError = ageInput.closest('.field').find('.error-message');

    // Verificar el texto del error (Jasmine usa 'toContain' o 'toBe')
    expect(nameError.text()).toContain('El nombre es requerido');
    expect(emailError.text()).toContain('El correo es requerido');
    expect(passwordError.text()).toContain('La contraseña es requerida');
    expect(ageError.text()).toContain('La edad es requerida');
  });

  it('debería mostrar error si el correo no tiene un dominio permitido', () => {
    // Simula escribir en el input de email
    emailInput.simulate('change', { target: { value: 'test@otrodominio.com' } });
    wrapper.find('form').simulate('submit');
    wrapper.update();

    const emailError = emailInput.closest('.field').find('.error-message');
    expect(emailError.text()).toContain('Solo correos @duoc.cl'); // Ajusta el mensaje si es diferente
  });

  it('debería mostrar error si la contraseña es muy corta', () => {
    passwordInput.simulate('change', { target: { value: '123' } }); // Menos de 4
    wrapper.find('form').simulate('submit');
    wrapper.update();

    const passwordError = passwordInput.closest('.field').find('.error-message');
    expect(passwordError.text()).toContain('Mínimo 4 caracteres');
  });

   it('debería mostrar error si la edad no es válida', () => {
    ageInput.simulate('change', { target: { value: '0' } }); // Menos de 1
    wrapper.find('form').simulate('submit');
    wrapper.update();

    const ageError = ageInput.closest('.field').find('.error-message');
    expect(ageError.text()).toContain('La edad debe ser válida');
  });

  // Prueba conceptual para envío válido (requiere mocks activos)
  // it('debería guardar en localStorage y mostrar alerta al enviar formulario válido', () => {
  //   // Activar spies si no están activos globalmente
  //   // spyOn(Storage.prototype, 'setItem');
  //   // global.alert = jasmine.createSpy('alertSpy');

  //   // Simular llenado de formulario
  //   nameInput.simulate('change', { target: { value: 'Usuario Valido' } });
  //   emailInput.simulate('change', { target: { value: 'valido@gmail.com' } });
  //   passwordInput.simulate('change', { target: { value: 'password123' } });
  //   ageInput.simulate('change', { target: { value: '30' } });

  //   wrapper.find('form').simulate('submit');
  //   wrapper.update(); // Podría ser necesario esperar si hay lógica asíncrona

  //   // Verificar spies de Jasmine
  //   expect(Storage.prototype.setItem).toHaveBeenCalledWith('valido@gmail.com', 'password123');
  //   expect(global.alert).toHaveBeenCalledWith(jasmine.stringMatching('Bienvenido Usuario Valido')); // Matcher de Jasmine
  // });

   // ... (Pruebas conceptuales para beneficios de edad, código, correo Duoc)

});


