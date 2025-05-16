// js/cart.js

// Inicializa el carrito desde localStorage o como un array vacío
let cart = JSON.parse(localStorage.getItem('gearUpGalaxyCart')) || [];

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem('gearUpGalaxyCart', JSON.stringify(cart));
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    const product = getProductById(productId); // Necesita acceso a getProductById

    if (!product) {
        console.error(`Error: Producto con ID ${productId} no encontrado.`);
        alert("Error: No se pudo añadir el producto. Producto no encontrado.");
        return; // Unhappy Path: Producto no existe
    }

    // Revisar si el producto ya está en el carrito para incrementar cantidad
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCountDisplay();
    alert(`${product.name} ha sido añadido al carrito!`); // Feedback (Happy Path)
    console.log("Carrito actual:", cart);
}

// Función para actualizar el contador del carrito en el navbar
function updateCartCountDisplay() {
    const cartCountElement = document.getElementById('cart-count-nav');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Función para obtener los items del carrito (para la página del carrito)
function getCartItems() {
    return cart;
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const initialLength = cart.length;
    cart = cart.filter(item => item.id !== productId);
    if (cart.length < initialLength) { // Happy path: item removed
        saveCart();
        updateCartCountDisplay();
        // Si estamos en la página del carrito, la volvemos a renderizar
        if (document.getElementById('cart-items-container')) {
            renderCartPageItems();
        }
        alert("Producto eliminado del carrito.");
    } else { // Unhappy path: item not found
        console.warn(`Intento de eliminar producto con ID ${productId} que no está en el carrito.`);
    }
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, newQuantity) {
    const productIndex = cart.findIndex(item => item.id === productId);
    newQuantity = parseInt(newQuantity);

    if (productIndex > -1) {
        if (newQuantity > 0) { // Happy path
            cart[productIndex].quantity = newQuantity;
        } else if (newQuantity === 0) { // Considerar eliminar si la cantidad es 0
            removeFromCart(productId); // Reutilizamos la función de eliminar
            return; // Salimos para no ejecutar el saveCart y render dos veces
        } else { // Unhappy Path: Cantidad inválida
            alert("La cantidad no puede ser negativa.");
            // Opcionalmente, revertir al valor anterior en el input
            if (document.getElementById('cart-items-container')) {
                 renderCartPageItems(); // Re-render para mostrar el valor correcto si el input fue cambiado erróneamente
            }
            return;
        }
        saveCart();
        updateCartCountDisplay();
        // Si estamos en la página del carrito, la volvemos a renderizar para actualizar totales
        if (document.getElementById('cart-items-container')) {
            renderCartPageItems();
        }
    } else { // Unhappy path: product not found
        console.error(`Error: Producto con ID ${productId} no encontrado en el carrito para actualizar cantidad.`);
    }
}

// Función para calcular el total del carrito
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}


// Ejecutar al cargar cualquier página para asegurar que el contador del carrito esté actualizado
document.addEventListener('DOMContentLoaded', () => {
    updateCartCountDisplay();
});