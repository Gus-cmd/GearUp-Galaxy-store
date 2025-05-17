// js/cart.js

// Inicializa el carrito desde localStorage o como un array vacío
// Esta variable 'cart' es accesible por todas las funciones dentro de este script.
let cart = JSON.parse(localStorage.getItem('gearUpGalaxyCart')) || [];

/**
 * Guarda el estado actual del array 'cart' en localStorage.
 */
function saveCart() {
    localStorage.setItem('gearUpGalaxyCart', JSON.stringify(cart));
    // console.log("Carrito guardado en localStorage:", cart); // Descomentar para depurar guardado
}

/**
 * Actualiza el contador de ítems del carrito en el navbar.
 * Busca un elemento con ID 'cart-count-nav'.
 */
function updateCartCountDisplay() {
    const cartCountElement = document.getElementById('cart-count-nav'); // ID estandarizado para el contador
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    } else {
        // Solo como fallback o si se usa un ID diferente en alguna página antigua.
        const fallbackCartCountElement = document.getElementById('cart-count');
        if (fallbackCartCountElement) {
            console.warn("Usando ID de fallback 'cart-count' para el contador. Se recomienda usar 'cart-count-nav'.");
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            fallbackCartCountElement.textContent = totalItems;
        } else {
            // console.warn("Elemento del contador del carrito ('cart-count-nav' o 'cart-count') no encontrado en el DOM actual.");
        }
    }
}

/**
 * Añade un producto al carrito o incrementa su cantidad si ya existe.
 * @param {number|string} productId - El ID del producto a añadir.
 */
function addToCart(productId) {
    // Verificar si getProductById está disponible (debería estar en product_data.js y cargado antes)
    if (typeof getProductById !== 'function') {
        console.error("Error en addToCart: La función getProductById no está definida. Asegúrate de que product_data.js se cargue primero.");
        alert("Error crítico: No se pueden obtener los datos del producto.");
        return;
    }

    const product = getProductById(parseInt(productId)); // Convertir a número por si acaso

    if (!product) {
        console.error(`Error en addToCart: Producto con ID ${productId} no encontrado.`);
        alert("Error: No se pudo añadir el producto. Producto no encontrado.");
        return;
    }

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 }); // Añade toda la info del producto más la cantidad
    }

    saveCart();
    updateCartCountDisplay();
    alert(`"${product.name}" ha sido añadido al carrito.`);
    console.log("Carrito actual:", cart);
}

/**
 * Elimina un producto completamente del carrito.
 * @param {number|string} productId - El ID del producto a eliminar.
 */
function removeFromCart(productId) {
    const idToRemove = parseInt(productId);
    const initialLength = cart.length;
    cart = cart.filter(item => item.id !== idToRemove);

    if (cart.length < initialLength) {
        saveCart();
        updateCartCountDisplay();
        // Si estamos en la página del carrito (cart.html), la volvemos a renderizar.
        // Se asume que cart.html tiene una función global renderCartPageItems().
        if (typeof renderCartPageItems === 'function' && document.getElementById('cart-items-container')) {
            renderCartPageItems();
        }
        alert("Producto eliminado del carrito.");
    } else {
        console.warn(`Intento de eliminar producto con ID ${idToRemove} que no está en el carrito.`);
    }
}

/**
 * Actualiza la cantidad de un producto específico en el carrito.
 * Si la nueva cantidad es 0, elimina el producto.
 * @param {number|string} productId - El ID del producto a actualizar.
 * @param {number|string} newQuantity - La nueva cantidad para el producto.
 */
function updateQuantity(productId, newQuantity) {
    const idToUpdate = parseInt(productId);
    const quantity = parseInt(newQuantity);

    const productIndex = cart.findIndex(item => item.id === idToUpdate);

    if (productIndex > -1) {
        if (quantity > 0) {
            cart[productIndex].quantity = quantity;
        } else if (quantity === 0) {
            // Si la cantidad es 0, eliminamos el producto usando la función existente.
            // removeFromCart ya se encarga de saveCart, updateCartCountDisplay y re-render.
            removeFromCart(idToUpdate); 
            return; // Salimos para evitar doble guardado o re-renderizado.
        } else {
            alert("La cantidad no puede ser negativa.");
            // Si estamos en cart.html, re-renderizar para restaurar el valor anterior en el input
            if (typeof renderCartPageItems === 'function' && document.getElementById('cart-items-container')) {
                renderCartPageItems(); 
            }
            return;
        }
        
        saveCart();
        updateCartCountDisplay();

        // Si estamos en la página del carrito, la volvemos a renderizar para actualizar totales y subtotales.
        if (typeof renderCartPageItems === 'function' && document.getElementById('cart-items-container')) {
            renderCartPageItems();
        }
    } else {
        console.error(`Error en updateQuantity: Producto con ID ${idToUpdate} no encontrado en el carrito.`);
    }
}

/**
 * Devuelve el array actual de ítems en el carrito.
 * @returns {Array} Array de objetos producto en el carrito.
 */
function getCartItems() {
    return cart;
}

/**
 * Calcula el precio total de todos los ítems en el carrito.
 * @returns {string} El total formateado a dos decimales.
 */
function getCartTotal() {
    return cart.reduce((total, item) => {
        // Asegurarse de que price y quantity sean números para la suma
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return total + (price * quantity);
    }, 0).toFixed(2);
}

/**
 * Vacía completamente el carrito (tanto en memoria como en localStorage)
 * y actualiza el contador del navbar.
 * Esta función es útil para ser llamada desde checkout.js.
 */
function clearCart() {
    console.log("Limpiando carrito y actualizando UI desde cart.js...");
    cart = []; // Vacía el array en memoria
    saveCart(); // Guarda el array vacío en localStorage
    updateCartCountDisplay(); // Actualiza el contador del navbar
    // Si la página actual es cart.html, también deberíamos re-renderizarla para mostrarla vacía.
    if (typeof renderCartPageItems === 'function' && document.getElementById('cart-items-container')) {
        renderCartPageItems();
    }
}

// NO incluir un DOMContentLoaded listener aquí para llamar a updateCartCountDisplay.
// Es mejor que CADA PÁGINA HTML llame a updateCartCountDisplay (y updateUserNav de auth.js)
// en su propio bloque DOMContentLoaded. Esto da más control y evita llamadas múltiples
// o dependencias de si cart.js se cargó y ejecutó su propio DOMContentLoaded primero.

// Ejemplo de lo que va en cada HTML al final del body:
/*
<script>
  document.addEventListener('DOMContentLoaded', () => {
      if (typeof updateCartCountDisplay === 'function') {
          updateCartCountDisplay();
      }
      if (typeof updateUserNav === 'function') { // Si también usas auth.js
          updateUserNav();
      }
      // ... otras inicializaciones de la página específica ...
  });
</script>
*/