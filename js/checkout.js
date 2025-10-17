// js/checkout.js
document.addEventListener("DOMContentLoaded", () => {
  const checkoutItems = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");
  const paymentForm = document.getElementById("payment-form");
  const checkoutForm = document.getElementById("checkout-form");
  const cardFields = document.getElementById("card-fields");
  const paypalInfo = document.getElementById("paypal-info");

  // 🛒 Obtener productos del carrito
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Mostrar productos
  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p class='text-center text-muted'>Tu carrito está vacío.</p>";
    checkoutTotal.textContent = "$0.00";
  } else {
    checkoutItems.innerHTML = cart
      .map(
        (item) => `
        <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
          <div>
            <strong>${item.name || item.nombre}</strong><br>
            <small>Cantidad: ${item.quantity || 1}</small>
          </div>
          <span>$${(item.price || item.precio).toFixed(2)}</span>
        </div>`
      )
      .join("");

    const total = cart.reduce(
      (sum, item) => sum + (item.price || item.precio) * (item.quantity || 1),
      0
    );
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
  }

  // 💳 Mostrar formulario según el método
  checkoutForm.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      paymentForm.style.display = "block";
      if (radio.value === "paypal") {
        cardFields.style.display = "none";
        paypalInfo.style.display = "block";
      } else {
        cardFields.style.display = "block";
        paypalInfo.style.display = "none";
      }
    });
  });

  // ✅ Procesar pago simulado
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("⚠️ No hay productos en el carrito.");
      return;
    }

    const paymentMethod = checkoutForm.querySelector('input[name="payment"]:checked').value;

    if (paymentMethod === "paypal") {
      alert("✅ Redirigiendo a PayPal...");
    } else {
      alert("✅ Pago realizado con éxito con " + paymentMethod.toUpperCase());
    }

    localStorage.removeItem("cart");
    setTimeout(() => (window.location.href = "../index.html"), 1500);
  });
});
