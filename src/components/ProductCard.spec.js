import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Importa el Contexto para poder proveerlo en la prueba
import { CartContext } from '../context/CartContext'; 
// Importa el componente que vamos a probar
import ProductCard from './ProductCard'; 
// Importa los componentes de react-bootstrap usados dentro de ProductCard
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Mock simple para la función alert, ya que no funciona bien en el entorno de Jest
global.alert = jest.fn();

// Objeto de producto simulado para usar en las pruebas
const mockProduct = {
  id: 'TC001',
  name: 'Torta Cuadrada de Chocolate',
  price: 45000,
  img: 'https://i.pinimg.com/736x/d1/e6/49/d1e649ae8884cf9e8eeba48c2599db89.jpg',
  category: 'tortas-cuadradas',
  description: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.',
};

// Agrupamos las pruebas relacionadas con ProductCard
describe('Componente ProductCard', () => {
  
  // Creamos una función simulada (mock) para 'addToCart'
  // Esto nos permite verificar si es llamada y con qué argumentos
  const mockAddToCart = jest.fn();

  // Función helper para renderizar el componente con el Provider del carrito
  // Esto es necesario porque ProductCard usa 'useCart()' que depende de CartContext
  const renderProductCard = (product) => {
    render(
      // Proveemos un valor simulado para el contexto, 
      // incluyendo nuestra función simulada 'mockAddToCart'
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <ProductCard product={product} />
      </CartContext.Provider>
    );
  };

  // Limpiamos los mocks después de cada prueba para evitar interferencias
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Primera prueba: Verificar que la información se muestra correctamente
  test('renderiza la información del producto correctamente', () => {
    renderProductCard(mockProduct);

    // Verifica que el nombre del producto (título de la tarjeta) esté presente
    expect(screen.getByRole('heading', { name: mockProduct.name })).toBeInTheDocument();
    // Verifica que el precio se muestre con el formato correcto
    expect(screen.getByText(`$${mockProduct.price.toLocaleString('es-CL')}`)).toBeInTheDocument();
    // Verifica que la imagen tenga el 'alt' y 'src' correctos
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute('src', mockProduct.img);
     // Verifica que la descripción esté presente
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    // Verifica que el botón "Añadir al Carrito" exista
    expect(screen.getByRole('button', { name: /Añadir al Carrito/i })).toBeInTheDocument();
  });

  // Segunda prueba: Verificar la interacción al hacer clic en el botón
  test('llama a addToCart con el producto correcto al hacer clic', () => {
    renderProductCard(mockProduct);
    // Encuentra el botón por su texto
    const addButton = screen.getByRole('button', { name: /Añadir al Carrito/i });

    // Simula un clic en el botón
    fireEvent.click(addButton);

    // Verificamos que nuestra función simulada (mockAddToCart) fue llamada una vez
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    // Verificamos que fue llamada específicamente con el objeto 'mockProduct'
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    // Verificamos también que la alerta simulada fue llamada
    expect(global.alert).toHaveBeenCalledWith(`${mockProduct.name} ha sido añadido al carrito!`);
  });
});

