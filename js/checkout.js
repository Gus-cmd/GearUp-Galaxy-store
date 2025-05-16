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
        // Asegúrate de que estas funciones de cart.js sean accesibles globalmente
        // o que cart.js esté estructurado para exportarlas/importarlas si usas módulos.
        // Para esta simulación, asumimos que son globales o que checkout.js tiene acceso.
        if (typeof getCartItems !== 'function' || typeof getCartTotal !== 'function') {
            console.error("Funciones getCartItems o getCartTotal de cart.js no están disponibles.");
            if (checkoutCartItemsContainer) checkoutCartItemsContainer.innerHTML = '<li class="list-group-item text-danger">Error al cargar el carrito.</li>';
            if (placeOrderBtn) placeOrderBtn.disabled = true;
            return;
        }

        const cartItems = getCartItems();
        
        if (!checkoutCartItemsContainer || !checkoutCartTotalElement) {
            console.error("Elementos del DOM para el resumen del carrito no encontrados.");
            return;
        }

        if (cartItems.length === 0) {
            checkoutCartItemsContainer.innerHTML = '<li class="list-group-item">Tu carrito está vacío.</li>';
            checkoutCartTotalElement.textContent = '$0.00';
            if (placeOrderBtn) placeOrderBtn.disabled = true;
            return;
        }

        checkoutCartItemsContainer.innerHTML = cartItems.map(item => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <span class="fw-medium">${item.name}</span> <small class="text-muted">(x${item.quantity})</small>
                </div>
                <span class="text-muted">$${(item.price * item.quantity).toFixed(2)}</span>
            </li>
        `).join('');

        checkoutCartTotalElement.textContent = `$${getCartTotal()}`;
        if (placeOrderBtn) placeOrderBtn.disabled = false;
    }

    // --- Manejar Visibilidad de Detalles de Tarjeta ---
    function handlePaymentMethodChange() {
        if (!cardDetailsForm) return; // Salir si el elemento no existe
        const selectedMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedMethodRadio) return; // Salir si no hay ninguno seleccionado (poco probable con 'checked' inicial)

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
    
    // --- Mostrar Mensajes de Checkout (Mejorados) ---
    function showCheckoutMessage(message, type = "danger", includeIcon = true) {
        if (checkoutMessageElement) {
            let iconHtml = '';
            if (includeIcon) {
                if (type === "success") {
                    iconHtml = '<i class="fas fa-check-circle me-2"></i>';
                } else if (type === "danger") {
                    iconHtml = '<i class="fas fa-exclamation-triangle me-2"></i>';
                } else if (type === "warning") {
                    iconHtml = '<i class="fas fa-exclamation-circle me-2"></i>';
                }
            }
            checkoutMessageElement.innerHTML = `${iconHtml}${message}`;
            checkoutMessageElement.className = `alert alert-${type} d-flex align-items-center mt-3`; // d-flex para alinear ícono y texto
            checkoutMessageElement.style.display = 'flex'; // Usar flex para la alerta
            checkoutMessageElement.setAttribute('role', 'alert');
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave al tope
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
            if (!selectedPaymentMethodRadio) { // Asegurarse que uno esté seleccionado
                 showCheckoutMessage("Por favor, selecciona un método de pago.", "danger");
                return;
            }
            const selectedPaymentMethod = selectedPaymentMethodRadio.value;
            console.log("Método de pago seleccionado:", selectedPaymentMethod);

            if (selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard') {
                const cardNumber = document.getElementById('cardNumber').value.trim();
                const cardExpiry = document.getElementById('cardExpiry').value.trim();
                const cardCvc = document.getElementById('cardCvc').value.trim();
                
                // Validación simulada básica de tarjeta (solo longitud para el ejemplo)
                if (cardNumber.length < 15 || cardExpiry.length < 5 || cardCvc.length < 3) {
                    showCheckoutMessage("Por favor, ingresa detalles de tarjeta válidos (simulación de longitud).", "danger");
                    return;
                }
                if (Math.random() < 0.1) { 
                    showCheckoutMessage("El pago con tarjeta fue rechazado por el banco (simulación). Intenta de nuevo.", "danger");
                    return;
                }
            }
            // No se necesitan validaciones especiales para PayPal o COD en esta simulación.

            console.log("Procesando pedido (simulación)...");
            placeOrderBtn.disabled = true;
            placeOrderBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';

            setTimeout(() => { // Simula el tiempo de procesamiento del "pago"
                const orderNumber = `GG-${Date.now().toString().slice(-6)}`;
                
                showCheckoutMessage(`¡Gracias por tu pedido! Tu orden #${orderNumber} ha sido confirmada (Simulación). Serás redirigido a la página principal.`, "success");
                
                // Limpiar el carrito
                if (typeof clearCart === 'function') { // Función de cart.js
                    clearCart();
                } else {
                    console.warn("Función clearCart() no encontrada. Limpiando localStorage directamente y esperando que cart.js se actualice en la próxima carga.");
                    localStorage.removeItem('gearUpGalaxyCart');
                    // Si las funciones de cart.js son globales, puedes llamarlas directamente:
                    if (typeof cart !== 'undefined' && Array.isArray(cart) && typeof saveCart === 'function' && typeof updateCartCountDisplay === 'function') {
                         cart.length = 0; 
                         saveCart(); 
                         updateCartCountDisplay();
                    }
                }
                
                // Actualizar visualización del carrito en esta página (estará vacío)
                loadCartSummary(); 

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
    const fullNameInput = document.getElementById('fullName'); // Guardar referencia

    if (loggedInUser && fullNameInput) {
        fullNameInput.value = loggedInUser.name || ""; // Precargar nombre si está logueado
    } else if (!loggedInUser && fullNameInput){
        console.warn("Usuario no logueado realizando checkout como invitado (simulación).");
        // Podrías dejar los campos de envío vacíos o con placeholders
        // fullNameInput.value = ""; // Opcional: limpiar si no hay usuario
    }
});