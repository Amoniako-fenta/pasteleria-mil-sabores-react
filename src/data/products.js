// Los datos de tus productos
// Las rutas en 'img' ahora son links externos
export const products = [
  // --- Tortas Cuadradas ---
  {
    id: 'TC001',
    name: 'Torta Cuadrada de Chocolate',
    price: 45000,
    category: 'tortas-cuadradas',
    img: 'https://i.pinimg.com/736x/d1/e6/49/d1e649ae8884cf9e8eeba48c2599db89.jpg',
    description: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.'
  },
  {
    id: 'TC002',
    name: 'Torta Cuadrada de Frutas',
    price: 50000,
    category: 'tortas-cuadradas',
    img: 'https://i.pinimg.com/1200x/5a/3e/44/5a3e446ea093cd1477b85790e521f58b.jpg',
    description: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.'
  },
  // --- Tortas Circulares ---
  {
    id: 'TT001',
    name: 'Torta Circular de Vainilla',
    price: 40000,
    category: 'tortas-circulares',
    img: 'https://i.pinimg.com/736x/3e/68/56/3e68563b22627593ca68d5c3f32ac9d1.jpg',
    description: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con glaseado dulce.'
  },
  {
    id: 'TT002',
    name: 'Torta Circular de Manjar',
    price: 42000,
    category: 'tortas-circulares',
    img: 'https://i.pinimg.com/1200x/f8/21/54/f82154e4f2e38793ce7af18488d27490.jpg',
    description: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores clásicos.'
  },
  // --- Postres Individuales ---
  {
    id: 'PI001',
    name: 'Mousse de Chocolate',
    price: 5000,
    category: 'postres-individuales',
    img: 'https://i.pinimg.com/1200x/f4/ce/e5/f4cee5e7149731cc9dd440115a194fbf.jpg',
    description: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad.'
  },
  {
    id: 'PI002',
    name: 'Tiramisú Clásico',
    price: 5500,
    category: 'postres-individuales',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsJpU_95skNNdIG9JRp8_gBFqEGQ4PAd5aA&s',
    description: 'Postre italiano con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.'
  },
  // --- Sin Azúcar ---
  {
    id: 'PSA001',
    name: 'Torta Sin Azúcar de Naranja',
    price: 48000,
    category: 'sin-azucar',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoUo8-HIVi28cZg_s7f6Jpo2rKpT5AmPO7zw&s',
    description: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para opciones saludables.'
  },
  {
    id: 'PSA002',
    name: 'Cheesecake Sin Azúcar',
    price: 47000,
    category: 'sin-azucar',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLIMKrseuLvIqLkHtfM7jVZfUQV1Zo7ssyaA&s',
    description: 'Suave y cremoso, perfecto para disfrutar sin culpa.'
  },
  // --- Pastelería Tradicional ---
  {
    id: 'PT001',
    name: 'Empanada de Manzana',
    price: 3000,
    category: 'pasteleria-tradicional',
    img: 'https://i.pinimg.com/736x/b4/e4/7d/b4e47d6e777bfde9e072f2ffe096c1ef.jpg',
    description: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.'
  },
  {
    id: 'PT002',
    name: 'Tarta de Santiago',
    price: 6000,
    category: 'pasteleria-tradicional',
    img: 'https://yhoyquecomemos.com/wp-content/uploads/2022/03/receta-de-tarta-de-santiago.jpg',
    description: 'Tradicional tarta española hecha con almendras, azúcar y huevos, una delicia clásica.'
  },
  // --- Sin Gluten ---
  {
    id: 'PG001',
    name: 'Brownie Sin Gluten',
    price: 4000,
    category: 'sin-gluten',
    img: 'https://i.pinimg.com/736x/60/f5/a5/60f5a5ce8775a0fcc170194b69793597.jpg',
    description: 'Rico y denso, este brownie es perfecto para quienes evitan el gluten sin sacrificar el sabor.'
  },
  {
    id: 'PG002',
    name: 'Pan Sin Gluten',
    price: 3500,
    category: 'sin-gluten',
    img: 'https://i.pinimg.com/736x/20/f0/1a/20f01a160ee9bd1060e95f02a222d40b.jpg',
    description: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.'
  },
  // --- Vegana ---
  {
    id: 'PV001',
    name: 'Torta Vegana de Chocolate',
    price: 50000,
    category: 'vegana',
    img: 'https://i.pinimg.com/1200x/ca/1b/c2/ca1bc26d0dfe365207cf7a01b08995a4.jpg',
    description: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.'
  },
  {
    id: 'PV002',
    name: 'Galletas Veganas de Avena',
    price: 4500,
    category: 'vegana',
    img: 'https://i.pinimg.com/1200x/f4/d7/e2/f4d7e20d8ecbe5b5da7a78c4ce56fe4d.jpg',
    description: 'Crujientes y sabrosas, estas galletas son una excelente opción saludable y vegana.'
  },
  // --- Tortas Especiales ---
  {
    id: 'TE001',
    name: 'Torta Especial de Cumpleaños',
    price: 55000,
    category: 'tortas-especiales',
    img: 'https://i.pinimg.com/736x/ea/2f/c2/ea2fc20aa861070fd19d4d11330fa2bb.jpg',
    description: 'Diseñada para celebraciones, personalizable con decoraciones y mensajes únicos.'
  },
  {
    id: 'TE002',
    name: 'Torta Especial de Boda',
    price: 60000,
    category: 'tortas-especiales',
    img: 'https://i.pinimg.com/736x/91/b8/8e/91b88e2b5ff9842104ed2262c453564a.jpg',
    description: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.'
  }
];


