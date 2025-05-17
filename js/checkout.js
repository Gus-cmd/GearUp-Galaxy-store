// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const checkoutCartItemsContainer = document.getElementById('checkout-cart-items');
    const checkoutCartTotalElement = document.getElementById('checkout-cart-total');
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetailsForm = document.getElementById('card-details-form');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const checkoutMessageElement = document.getElementById('checkout-message');

    // --- Cargar Resumen del Carrito ---
    function loadCartSummary() {
        if (typeof getCartItems !== 'function' || typeof getCartTotal !== 'function') {
            console.error("Funciones getCartItems o getCartTotal de cart.js no están disponibles. Asegúrate de que cart.js se cargue antes y defina estas funciones globalmente.");
            if (checkoutCartItemsContainer) checkoutCartItemsContainer.innerHTML = '<li class="list-group-item text-danger">Error al cargar el resumen del carrito.</li>';
            if (placeOrderBtn) placeOrderBtn.disabled = true;
            return;
        }

        const cartItems = getCartItems();
        
        if (!checkoutCartItemsContainer || !checkoutCartTotalElement) {
            console.error("Elementos del DOM para el resumen del carrito en checkout.html no encontrados.");
            return;
        }

        if (cartItems.length === 0) {
            checkoutCartItemsContainer.innerHTML = '<li class="list-group-item">Tu carrito está vacío.</li>';
            checkoutCartTotalElement.textContent = 'S/.0.00'; // Moneda en Soles
            if (placeOrderBtn) placeOrderBtn.disabled = true;
            return;
        }

        // Mostrar ítems sin símbolo de moneda individual, como en la imagen de ejemplo.
        checkoutCartItemsContainer.innerHTML = cartItems.map(item => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <span class="fw-medium">${item.name}</span> <small class="text-muted">(x${item.quantity})</small>
                </div>
                <span class="text-muted"> ${(item.price * item.quantity).toFixed(2)}
            </li>
        `).join('');

        // El total sí lleva el símbolo de moneda.
        // Asumimos que getCartTotal() devuelve solo el NÚMERO como string (ej. "652.00")
        checkoutCartTotalElement.textContent = `S/.${getCartTotal()}`; // Moneda en Soles, como en la imagen "S/.652.00"
        if (placeOrderBtn) placeOrderBtn.disabled = false;
    }

    // --- Manejar Visibilidad de Detalles de Tarjeta ---
    function handlePaymentMethodChange() {
        if (!cardDetailsForm) return;
        const selectedMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedMethodRadio) return;

        const selectedMethod = selectedMethodRadio.value;
        const cardNumberInput = document.getElementById('cardNumber');
        const cardExpiryInput = document.getElementById('cardExpiry');
        const cardCvcInput = document.getElementById('cardCvc');

        if (selectedMethod === 'visa' || selectedMethod === 'mastercard') {
            cardDetailsForm.style.display = 'block';
            if (cardNumberInput) cardNumberInput.required = true;
            if (cardExpiryInput) cardExpiryInput.required = true;
            if (cardCvcInput) cardCvcInput.required = true;
        } else {
            cardDetailsForm.style.display = 'none';
            if (cardNumberInput) cardNumberInput.required = false;
            if (cardExpiryInput) cardExpiryInput.required = false;
            if (cardCvcInput) cardCvcInput.required = false;
        }
    }

    if (paymentMethodRadios.length > 0) {
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', handlePaymentMethodChange);
        });
        handlePaymentMethodChange(); // Estado inicial
    }
    
    // --- Mostrar Mensajes de Checkout (Mejorados con Íconos) ---
    function showCheckoutMessage(message, type = "danger", includeIcon = true) {
        if (checkoutMessageElement) {
            let iconHtml = '';
            if (includeIcon) {
                if (type === "success") {
                    iconHtml = '<i class="fas fa-check-circle fa-lg me-2"></i>'; // Ícono más grande
                } else if (type === "danger") {
                    iconHtml = '<i class="fas fa-exclamation-triangle fa-lg me-2"></i>';
                } else if (type === "warning") {
                    iconHtml = '<i class="fas fa-exclamation-circle fa-lg me-2"></i>';
                }
            }
            checkoutMessageElement.innerHTML = `${iconHtml}${message}`;
            checkoutMessageElement.className = `alert alert-${type} d-flex align-items-center mt-3 mb-3`; // mb-3 para espaciado
            checkoutMessageElement.style.display = 'flex';
            checkoutMessageElement.setAttribute('role', 'alert');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function hideCheckoutMessage() {
        if (checkoutMessageElement) {
            checkoutMessageElement.style.display = 'none';
        }
    }

    // --- Simular Finalización del Pedido ---
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            hideCheckoutMessage();
            
            if (typeof getCartItems !== 'function') { // Verificar si getCartItems existe
                showCheckoutMessage("Error: La función para obtener los ítems del carrito no está disponible.", "danger");
                return;
            }
            const cartItems = getCartItems();
            if (cartItems.length === 0) {
                showCheckoutMessage("Tu carrito está vacío. No puedes finalizar el pedido.", "warning");
                return;
            }

            const fullName = document.getElementById('fullName').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const zipCode = document.getElementById('zipCode').value.trim();

            if (!fullName || !address || !city || !zipCode) {
                showCheckoutMessage("Por favor, completa toda la información de envío.", "danger");
                return;
            }

            const selectedPaymentMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
            if (!selectedPaymentMethodRadio) {
                 showCheckoutMessage("Por favor, selecciona un método de pago.", "danger");
                return;
            }
            const selectedPaymentMethod = selectedPaymentMethodRadio.value;
            console.log("Método de pago seleccionado:", selectedPaymentMethod);

            if (selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard') {
                const cardNumber = document.getElementById('cardNumber').value.trim();
                const cardExpiry = document.getElementById('cardExpiry').value.trim();
                const cardCvc = document.getElementById('cardCvc').value.trim();
                
                if (cardNumber.length < 15 || cardExpiry.length < 5 || cardCvc.length < 3) { // Longitud mínima para simulación
                    showCheckoutMessage("Por favor, ingresa detalles de tarjeta válidos (simulación de longitud).", "danger");
                    return;
                }
                if (Math.random() < 0.1) { 
                    showCheckoutMessage("El pago con tarjeta fue rechazado por el banco (simulación). Intenta de nuevo.", "danger");
                    return;
                }
            }

            console.log("Procesando pedido (simulación)...");
            placeOrderBtn.disabled = true;
            placeOrderBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';

            setTimeout(() => { // Simula el tiempo de procesamiento del "pago"
                const orderNumber = `GG-${Date.now().toString().slice(-6)}`;
                
                showCheckoutMessage(`¡Gracias por tu compra! Tu orden #${orderNumber} ha sido confirmada (Simulación). Serás redirigido a la página principal en unos segundos.`, "success");
                
                // Limpiar el carrito
                if (typeof clearCart === 'function') {
                    clearCart();
                } else {
                    console.warn("Función clearCart() no encontrada. Intentando limpiar localStorage directamente.");
                    localStorage.removeItem('gearUpGalaxyCart');
                    // Actualizar el contador del navbar si la función está disponible
                    if (typeof updateCartCountDisplay === 'function') {
                         // Para que updateCartCountDisplay funcione después de limpiar localStorage directamente,
                         // necesitaría que el array 'cart' en cart.js también se resetee o se relea.
                         // Es mejor asegurar que clearCart() esté bien definida y sea accesible.
                         updateCartCountDisplay();
                    }
                }
                
                loadCartSummary(); // Actualiza el resumen del carrito en esta página (mostrará carrito vacío)

                // Redirigir a index.html después de un breve tiempo
                setTimeout(() => {
                    let indexPath = '../index.html'; // Asume que checkout.html está en /pages/
                    if (!window.location.pathname.includes('/pages/')) {
                        indexPath = 'index.html';
                    }
                    window.location.href = indexPath;
                }, 3500); // Espera 3.5 segundos después de mostrar el mensaje de éxito antes de redirigir

            }, 2000); // Simula 2 segundos de "procesamiento de pago"
        });
    }

    // --- Inicializar Vista ---
    loadCartSummary();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const fullNameInput = document.getElementById('fullName');

    if (loggedInUser && fullNameInput) {
        fullNameInput.value = loggedInUser.name || "";
    } else if (!loggedInUser && fullNameInput){
        console.warn("Usuario no logueado realizando checkout como invitado (simulación).");
    }
});