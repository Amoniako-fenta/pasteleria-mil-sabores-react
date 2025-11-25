// src/tests/basic.test.js

// 'describe' define una "Suite de Pruebas"
describe("1000 Sabores - Pruebas Básicas", function() {

  // 1. Verificación de entorno
  it("Verificación de entorno de testing", function() {
    // 'expect' es la aserción o expectativa
    expect(true).toBe(true);
  });

  // 2. Operaciones matemáticas
  it("Operaciones matemáticas básicas", function() {
    let suma = 10 + 10;
    expect(suma).toBe(20);
  });

  // 3. Cálculo de precios
  it("Cálculo de precios con descuento", function() {
    const precioOriginal = 100;
    const descuento = 0.10; // 10%
    const precioFinal = precioOriginal * (1 - descuento);
    expect(precioFinal).toBe(90);
  });

  // 4. Formateo de nombres
  it("Formateo de nombres de productos", function() {
    const nombreProducto = "   torta de chocolate   ";
    // .trim() quita espacios al inicio/final
    // .toUpperCase() convierte a mayúsculas
    const nombreFormateado = nombreProducto.trim().toUpperCase();
    expect(nombreFormateado).toBe("TORTA DE CHOCOLATE");
  });

  // 5. Validación de emails
  it("Validación de emails", function() {
    const emailValido = "correo@dominio.com";
    const emailInvalido = "correo-invalido";
    
    // Expresión regular simple para validar email
    const regexEmail = /\S+@\S+\.\S+/; 
    
    expect(regexEmail.test(emailValido)).toBe(true);
    expect(regexEmail.test(emailInvalido)).toBe(false);
  });

  // 6. Filtrado de productos
  it("Filtrado de productos por categoría", function() {
    const productos = [
      { id: 1, nombre: "Torta", categoria: "Tortas" },
      { id: 2, nombre: "Kuchen", categoria: "Kuchenes" },
      { id: 3, nombre: "Torta Mil Hojas", categoria: "Tortas" }
    ];
    const tortas = productos.filter(p => p.categoria === "Tortas");
    expect(tortas.length).toBe(2);
    expect(tortas[0].nombre).toBe("Torta");
  });

  // 7. Búsqueda por ID
  it("Búsqueda de productos por ID", function() {
    const productos = [
      { id: 1, nombre: "Torta" },
      { id: 2, nombre: "Kuchen" }
    ];
    const encontrado = productos.find(p => p.id === 2);
    expect(encontrado.nombre).toBe("Kuchen");
  });

  // 8. Cálculo total del carrito
  it("Cálculo de total del carrito", function() {
    const carrito = [
      { id: 1, precio: 1000, cantidad: 2 }, // 2000
      { id: 2, precio: 500, cantidad: 1 }  // 500
    ];
    // .reduce() para sumar el total
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    expect(total).toBe(2500);
  });

  // 9. Persistencia en localStorage (Simulación simple)
  it("Persistencia de datos en localStorage", function() {
    // Jasmine puede 'espiar' objetos globales como localStorage
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');

    // Simulamos guardar y leer un dato
    localStorage.setItem("miDato", "valor123");
    localStorage.getItem("miDato");

    // Verificamos que las funciones fueron llamadas con los argumentos correctos
    expect(localStorage.setItem).toHaveBeenCalledWith("miDato", "valor123");
    expect(localStorage.getItem).toHaveBeenCalledWith("miDato");
  });

  // 10. Manejo de carrito vacío
  it("Manejo de carrito vacío", function() {
    const carritoVacio = [];
    const total = carritoVacio.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    expect(total).toBe(0);
  });

});
