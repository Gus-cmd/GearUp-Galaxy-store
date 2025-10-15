// Detectar si estamos dentro de /pages/ o en la raíz
const basePath = window.location.pathname.includes("/pages/")
  ? "../assets/images/"
  : "assets/images/";

// Lista de productos
const products = [
  {
    id: 1,
    name: "Teclado Mecánico Gamer RGB Pro X",
    category: "Teclados",
    price: 290.00,
    description: "Teclado mecánico con switches ultra-rápidos, iluminación RGB personalizable y reposamuñecas magnético. Perfecto para largas sesiones de gaming.",
    image: `${basePath}tecladomecanico.jpg`,
    stock: 15
  },
  {
    id: 2,
    name: "Mouse Óptico Gaming Viper 12000 DPI",
    category: "Mouses",
    price: 179.00,
    description: "Mouse ergonómico con sensor óptico de alta precisión, 8 botones programables y peso ajustable. Domina cada movimiento.",
    image: `${basePath}mauseoptico.jpg`,
    stock: 22
  },
  {
    id: 3,
    name: "Auriculares Gaming Kraken Surround 7.1",
    category: "Audio",
    price: 326.00,
    description: "Sonido envolvente 7.1 para una inmersión total. Micrófono con cancelación de ruido y almohadillas de gel refrigerante.",
    image: `${basePath}auricularkraken.jpg`,
    stock: 10
  },
  {
    id: 4,
    name: "Monitor Curvo UltraWide 34\" QHD 144Hz",
    category: "Monitores",
    price: 1633.00,
    description: "Experimenta tus juegos como nunca antes con este monitor curvo QHD de 144Hz y 1ms de respuesta. Colores vibrantes y fluidez extrema.",
    image: `${basePath}monitor34p.jpg`,
    stock: 5
  },
  {
    id: 5,
    name: "Alfombrilla XXL Control Edition",
    category: "Accesorios",
    price: 90.00,
    description: "Superficie de tela optimizada para un control preciso del mouse. Base de goma antideslizante y bordes cosidos.",
    image: `${basePath}alfonbrillaxxl.jpg`,
    stock: 30
  },
  {
    id: 6,
    name: "Monitor Curvo Ultrawade 29\" QHD 144HZ",
    category: "Monitores",
    price: 969.00,
    description: "Monitor curvo QHD de 29 pulgadas con 144Hz y 1ms de respuesta. Colores vibrantes y fluidez extrema.",
    image: `${basePath}monitor29p.jpg`,
    stock: 30
  },
  {
    id: 7,
    name: "BENGOO G9000",
    category: "Audio",
    price: 146.00,
    description: "Auriculares estéreo para juegos con cancelación de ruido, micrófono y luz LED.",
    image: `${basePath}auricularbengoo.jpg`,
    stock: 30
  },
  {
    id: 8,
    name: "Redragon M810 Pro",
    category: "Mouses",
    price: 109.00,
    description: "Mouse inalámbrico para juegos con 8 botones macro y retroiluminación RGB.",
    image: `${basePath}mouseredragonm810.jpg`,
    stock: 30
  },
  {
    id: 9,
    name: "AULA F75 Pro 75%",
    category: "Teclados",
    price: 240.00,
    description: "Teclado inalámbrico 75% con retroiluminación RGB y teclas intercambiables.",
    image: `${basePath}tecladoaulaf75pro.jpg`,
    stock: 30
  },
  {
    id: 10,
    name: "Redragon K673 PRO 75%",
    category: "Teclados",
    price: 145.22,
    description: "Teclado mecánico compacto con RGB, perilla de control y 3 modos de conexión.",
    image: `${basePath}tecladoRedragonK673PRO.jpg`,
    stock: 30
  },
  {
    id: 11,
    name: "Logitech G 213 Prodigy",
    category: "Teclados",
    price: 145.22,
    description: "Teclado RGB resistente a derrames con teclas multimedia dedicadas.",
    image: `${basePath}tecladologitec.jpg`,
    stock: 30
  },
  {
    id: 12,
    name: "HyperX Cloud III",
    category: "Audio",
    price: 145.22,
    description: "Auriculares con cable y sonido DTS, espuma viscoelástica y micrófono ultraclaro.",
    image: `${basePath}audifonoshyper.jpg`,
    stock: 30
  },
  {
    id: 13,
    name: "Razer BlackWidow V4 X",
    category: "Teclados",
    price: 471.92,
    description: "Teclado mecánico con switches Razer Green y 6 teclas macro programables.",
    image: `${basePath}razerblack.jpg`,
    stock: 30
  },
  {
    id: 14,
    name: "Razer Viper V3 Hyperspeed",
    category: "Mouses",
    price: 217.79,
    description: "Mouse inalámbrico de alta precisión y diseño ambidiestro.",
    image: `${basePath}mouserazerviper.jpg`,
    stock: 30
  },
  {
    id: 15,
    name: "Razer BlackShark V2 Pro",
    category: "Audio",
    price: 799.00,
    description: "Auriculares inalámbricos con sonido envolvente y micrófono profesional.",
    image: `${basePath}audifonosblack.jpg`,
    stock: 30
  },
  {
    id: 16,
    name: "Monitor Xiaomi G34WQi 34\"",
    category: "Monitores",
    price: 1179.00,
    description: "Monitor curvo de 34 pulgadas con resolución QHD y 144Hz.",
    image: `${basePath}pantallaxiamomi.jpg`,
    stock: 30
  },
  {
    id: 17,
    name: "Strata Liquid Mouse Pad XXL",
    category: "Accesorios",
    price: 130.00,
    description: "Alfombrilla de gran tamaño optimizada para precisión extrema.",
    image: `${basePath}mousepadliquid.jpg`,
    stock: 30
  },
  {
    id: 18,
    name: "Logitech G Pro X 60 Lightspeed",
    category: "Teclados",
    price: 929.90,
    description: "Teclado inalámbrico compacto con retroiluminación RGB personalizable.",
    image: `${basePath}tecladologitechgprox60black.jpg`,
    stock: 30
  },
  {
    id: 19,
    name: "Redragon Taipan Pro M810 RGB",
    category: "Mouses",
    price: 173.42,
    description: "Mouse inalámbrico con 8 botones programables y retroiluminación RGB.",
    image: `${basePath}RedragonTaipanProM810.jpg`,
    stock: 30
  },
  {
    id: 20,
    name: "PHOINIKAS Gaming Headset",
    category: "Audio",
    price: 55.00,
    description: "Auriculares multiplataforma con micrófono y cancelación de ruido.",
    image: `${basePath}audifonosphoinka.jpg`,
    stock: 30
  },
  {
    id: 21,
    name: "LG UltraGear 27\" QHD 165Hz",
    category: "Monitores",
    price: 1499.00,
    description: "Monitor QHD de 27 pulgadas, 165Hz y 1ms de respuesta.",
    image: `${basePath}pantallalg.jpg`,
    stock: 30
  },
  {
    id: 22,
    name: "Corsair MM300 PRO Extended",
    category: "Accesorios",
    price: 159.00,
    description: "Alfombrilla optimizada para precisión con base antideslizante.",
    image: `${basePath}mousepad3000.jpg`,
    stock: 30
  }
];

// Funciones auxiliares
function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find(product => product.id === parseInt(id));
}
