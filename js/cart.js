// ✅ js/cart.js
import { getProductById, localProducts } from "./product-data.js";

/* ------------------------------------------------------- */
/* 🔹 ACTUALIZAR CONTADOR DEL CARRITO                      */
/* ------------------------------------------------------- */
export function updateCartCountDisplay() {
  const countElement = document.getElementById("cart-count-nav");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (countElement) countElement.textContent = cart.length;
}

/* ------------------------------------------------------- */
/* 🔹 AGREGAR PRODUCTO AL CARRITO                          */
/* ------------------------------------------------------- */
export async function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.id == id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
    alert("🔁 Cantidad actualizada en el carrito");
  } else {
    // ✅ Buscar primero en Firebase
    let product = await getProductById(id);

    // ✅ Si no lo encuentra, buscar entre los locales
    if (!product) {
      product = localProducts.find(p => String(p.id) === String(id));
    }

    if (product) {
      const newItem = {
        id,
        name: product.name || product.nombre || "Producto sin nombre",
        price: Number(product.price || product.precio || 0),
        image: product.image || product.imagen || "assets/images/default.png",
        quantity: 1
      };
      cart.push(newItem);
      alert(`✅ ${newItem.name} añadido al carrito`);
    } else {
      console.warn("⚠️ No se encontró el producto con id:", id);
      return;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCountDisplay();
}

/* ------------------------------------------------------- */
/* 🔹 ELIMINAR PRODUCTO DEL CARRITO                         */
/* ------------------------------------------------------- */
export function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id != id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCountDisplay();
  renderCart();
}

/* ------------------------------------------------------- */
/* 🔹 VACIAR CARRITO COMPLETO                              */
/* ------------------------------------------------------- */
export function clearCart() {
  localStorage.removeItem("cart");
  updateCartCountDisplay();
  renderCart();
}

/* ------------------------------------------------------- */
/* 🔹 RENDERIZAR CARRITO                                   */
/* ------------------------------------------------------- */
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
    const precio = Number(item.price || item.precio || 0);
    total += precio * (item.quantity || 1);

    // 🧠 Corregir ruta de imagen según el contexto de la página
    let imageSrc = item.image || item.imagen || "assets/images/default.png";
    if (!imageSrc.startsWith("http") && !imageSrc.startsWith("../")) {
      if (window.location.pathname.includes("/pages/")) {
        imageSrc = "../" + imageSrc;
      }
    }

    const productCard = document.createElement("div");
    productCard.classList.add(
      "cart-item",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "p-3",
      "border-bottom"
    );

    productCard.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${imageSrc}" alt="${item.name || item.nombre}"
             style="width: 70px; height: 70px; object-fit: cover; border-radius: 10px;">
        <div class="ms-3">
          <h6 class="mb-1">${item.name || item.nombre}</h6>
          <p class="mb-0 text-success fw-bold">S/. ${precio.toFixed(2)} x ${item.quantity || 1}</p>
        </div>
      </div>
      <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    cartContainer.appendChild(productCard);
  });

  if (totalElement) totalElement.textContent = `S/. ${total.toFixed(2)}`;

  // 🗑️ Eliminar individualmente
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.closest("button").dataset.id;
      removeFromCart(id);
    });
  });
}

/* ------------------------------------------------------- */
/* 🔹 INICIALIZACIÓN AL CARGAR PÁGINA                      */
/* ------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCountDisplay();
  renderCart();

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
