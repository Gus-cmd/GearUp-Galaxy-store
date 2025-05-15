// js/product_data.js
const products = [
  {
      id: 1,
      name: "Teclado Mecánico Gamer RGB Pro X",
      category: "Teclados",
      price: 290.00,
      description: "Teclado mecánico con switches ultra-rápidos, iluminación RGB personalizable y reposamuñecas magnético. Perfecto para largas sesiones de gaming.",
      image: "../assets/images/tecladomecanico.jpg",
      stock: 15
  },
  {
      id: 2,
      name: "Mouse Óptico Gaming Viper 12000 DPI",
      category: "Mouses",
      price: 179.00,
      description: "Mouse ergonómico con sensor óptico de alta precisión, 8 botones programables y peso ajustable. Domina cada movimiento.",
      image: "../assets/images/mauseoptico.jpg",
      stock: 22
  },
  {
      id: 3,
      name: "Auriculares Gaming Kraken Surround 7.1",
      category: "Audio",
      price: 326.00,
      description: "Sonido envolvente 7.1 para una inmersión total. Micrófono con cancelación de ruido y almohadillas de gel refrigerante.",
      image: "../assets/images/auricularkraken.jpg",
      stock: 10
  },
  {
      id: 4,
      name: "Monitor Curvo UltraWide 34\" QHD 144Hz",
      category: "Monitores",
      price: 1633.00,
      description: "Experimenta tus juegos como nunca antes con este monitor curvo QHD de 144Hz y 1ms de respuesta. Colores vibrantes y fluidez extrema.",
      image: "../assets/images/monitor34p.jpg",
      stock: 5
  },
  {
      id: 5,
      name: "Alfombrilla XXL Control Edition",
      category: "Accesorios",
      price: 90.00,
      description: "Superficie de tela optimizada para un control preciso del mouse. Base de goma antideslizante y bordes cosidos.",
      image: "../assets/images/alfonbrillaxxl.jpg",
      stock: 30
  },
  {
    id: 6,
    name: "Monitor Curvo Ultrawade 29\" QHD 144HZ",
    category: "Monitores",
    price: 969.00,
    description: "Experimenta tus juegos como nunca antes con este monitor curvo QHD de 144Hz y 1ms de respuesta. Colores vibrantes y fluidez extrema.",
    image: "../assets/images/monitor29p.jpg",
    stock: 30
  },
  {
    id: 7,
    name: "BENGOO G9000",
    category: "Audio",
    price: 146.00,
    description: "Auriculares estéreo para juegos para PS4, PC, Xbox One PS5, cancelación de ruido, auriculares sobre la oreja con micrófono, luz LED, sonido envolvente de bajos, orejeras de memoria",
    image: "../assets/images/auricularbengoo.jpg",
    stock: 30
  },
  {
    id: 8,
    name: "Redragon M810 Pro",
    category: "Mouses",
    price: 109.00,
    description: "Mouse inalámbrico para juegos, 10000 DPI con cable/inalámbrico con llave de fuego rápido, 8 botones macro, capacidad de alimentación confiable de 45 horas y retroiluminación RGB",
    image: "../assets/images/mouseredragonm810.jpg",
    stock: 30
  },
  {
    id: 9,
    name: "AULA Teclado mecánico inalámbrico F75 Pro 75%",
    category: "Teclados",
    price: 240.00,
    description: "Teclado personalizado intercambiable en caliente con perilla, retroiluminación RGB, interruptores Reaper prelubricados, teclas PBT impresas laterales",
    image: "../assets/images/tecladoaulaf75pro.jpg",
    stock: 30
  },
  {
    id: 10,
    name: "Redragon K673 PRO 75%",
    category: "Teclados",
    price: 145.22,
    description: "Teclado inalámbrico para juegos Redragon K673 PRO 75% con junta RGB, 3 modos, 81 teclas, teclado mecánico compacto, conector hot-swap, perilla de control dedicada y almohadillas insonorizantes, interruptor rojo lineal.",
    image: "../assets/images/tecladoRedragonK673PRO.jpg",
    stock: 30
  },
  {
    id: 11,
    name: "Logitech G 213 Prodigy",
    category: "Teclados",
    price: 145.22,
    description: "Teclado para juegos, teclas retroiluminadas RGB LIGHTSYNC, resistentes a derrames, teclas personalizables, teclas multimedia dedicadas, color negro",
    image: "../assets/images/tecladologitec.jpg",
    stock: 30
  },
  {
    id: 12,
    name: "HyperX Cloud III",
    category: "Audio",
    price: 145.22,
    description: "Auriculares con cable para juegos, bocinas en ángulo 2 pulgadas (53 mm), DTS, espuma viscoelástica, micrófono ultraclaro de 25/64 pulgadas (10 mm), 2.4 GHz, 120 h de carga, negro",
    image: "../assets/images/audifonoshyper.jpg",
    stock: 30
  },
  {
    id: 13,
    name: "Teclado Razer BlackWidow V4 X",
    category: "Teclados",
    price: 471.92,
    description: "Teclado mecánico con switches Razer Green, iluminación RGB personalizable y 6 teclas macro programables.",
    image: "../assets/images/razerblack.jpg",
    stock: 30
  },
  {
    id: 14,
    name: "Mouse Razer Viper V3 Hyperspeed",
    category: "Mouses",
    price: 217.79,
    description: "Mouse inalámbrico con sensor óptico de alta precisión y diseño ambidiestro.",
    image: "../assets/images/mouserazerviper.jpg",
    stock: 30
  },
  {
    id: 15,
    name: "Auriculares Razer BlackShark V2 Pro",
    category: "Audio",
    price: 799.00,
    description: "Auriculares inalámbricos con sonido envolvente y micrófono de alta calidad.",
    image: "../assets/images/audifonosblack.jpg",
    stock: 30
  },
  {
    id: 16,
    name: "Monitor Xiaomi Curved Gaming G34WQi 34\"",
    category: "Monitores",
    price: 1179.00,
    description: "Monitor curvo de 34 pulgadas con resolución QHD y frecuencia de actualización de 144Hz.",
    image: "../assets/images/pantallaxiamomi.jpg",
    stock: 30
  },
  {
    id: 17,
    name: "Alfombrilla Strata Liquid Mouse Pad Gamer XXL",
    category: "Accesorios",
    price: 130.00,
    description: "Alfombrilla de gran tamaño con superficie optimizada para control preciso del mouse.",
    image: "../assets/images/mousepadliquid.jpg",
    stock: 30
  },
  {
    id: 18,
    name: "Teclado Logitech G Pro X 60 Lightspeed",
    category: "Teclados",
    price: 929.90,
    description: "Teclado inalámbrico con diseño compacto y retroiluminación RGB personalizable.",
    image: "../assets/images/tecladologitechgprox60black.jpg",
    stock: 30
  },
  {
    id: 19,
    name: "Mouse Inalámbrico Redragon Taipan Pro M810 RGB",
    category: "Mouses",
    price: 173.42,
    description: "Mouse inalámbrico para juegos con 10000 DPI, 8 botones programables y retroiluminación RGB.",
    image: "../assets/images/RedragonTaipanProM810.jpg",
    stock: 30
  },
  {
    id: 20,
    name: "Auriculares PHOINIKAS",
    category: "Audio",
    price: 55.00,
    description: "Auricular para juegos para PS4, Xbox One, computadora, laptop, Mac, PS4 con micrófono, auriculares sobre la oreja, cancelación de ruido, sonido envolvente, luz LED",
    image: "../assets/images/audifonosphoinka.jpg",
    stock: 30
  },
  {
    id: 21,
    name: "Monitor LG UltraGear 27\" QHD 165Hz",
    category: "Monitores",
    price: 1499.00,
    description: "Monitor para juegos con resolución QHD, frecuencia de actualización de 165Hz y tiempo de respuesta de 1ms.",
    image: "../assets/images/pantallalg.jpg",
    stock: 30
  },
  {
    id: 22,
    name: "Alfombrilla Corsair MM300 PRO Extended",
    category: "Accesorios",
    price: 159.00,
    description: "Alfombrilla de tela con superficie optimizada para precisión y base de goma antideslizante.",
    image: "../assets/images/mousepad3000.jpg",
    stock: 30
  }
];

// Función para obtener todos los productos (podría ser más compleja si vinieran de un API)
function getAllProducts() {
  return products;
}

// Función para obtener un producto por su ID
function getProductById(id) {
  return products.find(product => product.id === parseInt(id));
}