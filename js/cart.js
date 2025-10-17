// js/cart.js
import { getProductById } from "./product-data.js";

// ✅ Actualiza el contador del carrito (en navbar)
export function updateCartCountDisplay() {
  const countElement = document.getElementById("cart-count-nav");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (countElement) countElement.textContent = cart.length;
}

// ✅ Agregar producto al carrito (ahora soporta Firebase)
export async function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.id === id);

  if (!existingItem) {
    const product = await getProductById(id); // 👈 Espera producto de Firebase o local

    if (product) {
      const newItem = {
        id,
        nombre: product.nombre || product.name || "Producto sin nombre",
        precio: Number(product.precio || product.price || 0),
        imagen: product.imagen || product.image || "https://via.placeholder.com/150"
      };

      cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCountDisplay();
      alert("✅ Producto añadido al carrito");
    } else {
      console.error("⚠️ No se encontró el producto con id:", id);
    }
  } else {
    alert("⚠️ Este producto ya está en el carrito");
  }
}

// ✅ Quitar producto del carrito
export function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCountDisplay();
  renderCart();
}

// ✅ Vaciar carrito
export function clearCart() {
  localStorage.removeItem("cart");
  updateCartCountDisplay();
  renderCart();
}

// ✅ Renderizar carrito completo
export function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center mt-5">
        <h4>🛒 Tu carrito está vacío</h4>
        <a href="../index.html" class="btn btn-primary mt-3">Seguir comprando</a>
      </div>
    `;
    if (totalElement) totalElement.textContent = "S/. 0.00";
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const precio = Number(item.precio || 0);
    total += precio;

    const productCard = document.createElement("div");
    productCard.classList.add("cart-item", "d-flex", "align-items-center", "justify-content-between", "p-3");
    productCard.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 10px;">
        <div class="ms-3">
          <h6 class="mb-1">${item.nombre}</h6>
          <p class="mb-0 text-success fw-bold">S/. ${precio.toFixed(2)}</p>
        </div>
      </div>
      <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    cartContainer.appendChild(productCard);
  });

  if (totalElement) totalElement.textContent = `S/. ${total.toFixed(2)}`;

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.closest("button").dataset.id;
      removeFromCart(id);
    });
  });
}

// ✅ Inicializar
document.addEventListener("DOMContentLoaded", () => {
  updateCartCountDisplay();
  renderCart();

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
