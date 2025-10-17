// ✅ js/product-detail.js (versión final)
import { db } from "./firebase.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getProductById, localProducts } from "./product-data.js";
import { addToCart, updateCartCountDisplay } from "./cart.js";

/* ------------------------------------------------------- */
/* 🔹 FUNCIÓN PRINCIPAL: Cargar detalle del producto        */
/* ------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    showError(container, "⚠️ Producto no encontrado");
    return;
  }

  try {
    // ✅ 1. Intentar buscar en Firebase
    const product = await getProductById(productId);

    // ✅ 2. Si no está en Firebase, buscar en productos locales
    let finalProduct = product;
    if (!finalProduct) {
      finalProduct = localProducts.find(p => String(p.id) === String(productId));
    }

    // ✅ 3. Si aún no se encuentra, mostrar error
    if (!finalProduct) {
      showError(container, "⚠️ Producto no disponible");
      return;
    }

    renderProductDetail(container, finalProduct);
  } catch (error) {
    console.error("❌ Error al cargar el producto:", error);
    showError(container, "❌ Error al cargar el producto");
  }
});

/* ------------------------------------------------------- */
/* 🎨 FUNCIÓN PARA RENDERIZAR DETALLE DEL PRODUCTO          */
/* ------------------------------------------------------- */
function renderProductDetail(container, product) {
  const imagePath = resolveImagePath(product.image || product.imagen || "assets/images/default.png");
  const price = Number(product.price || product.precio || 0).toFixed(2);

  container.innerHTML = `
    <div class="card border-0 shadow-lg bg-dark text-white p-4 rounded-4">
      <div class="row g-4">
        <div class="col-md-6 text-center">
          <img src="${imagePath}" alt="${product.name}" class="img-fluid rounded-3 shadow-sm" 
               style="max-height: 400px; object-fit: contain;">
        </div>
        <div class="col-md-6">
          <h2 class="fw-bold mb-3">${product.name || product.nombre}</h2>
          <p class="text-info fw-semibold mb-2">${product.category || product.categoria || "Sin categoría"}</p>
          <p class="text-light mb-4">${product.description || product.descripcion || "Sin descripción disponible."}</p>
          <h4 class="text-success fw-bold mb-4">S/. ${price}</h4>
          <button class="btn btn-primary btn-lg w-100 mb-3" id="add-to-cart-btn">
            <i class="fas fa-cart-plus me-2"></i> Añadir al carrito
          </button>
          <a href="../index.html" class="btn btn-outline-light w-100">
            <i class="fas fa-arrow-left me-2"></i> Volver a la tienda
          </a>
        </div>
      </div>
    </div>
  `;

  // 🛒 Agregar al carrito
  const addBtn = document.getElementById("add-to-cart-btn");
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      await addToCart(String(product.id));
      updateCartCountDisplay();
    });
  }
}

/* ------------------------------------------------------- */
/* ⚠️ FUNCIÓN PARA MOSTRAR MENSAJES DE ERROR               */
/* ------------------------------------------------------- */
function showError(container, message) {
  container.innerHTML = `
    <div class="text-center mt-5">
      <h4 class="text-warning">${message}</h4>
      <a href="../index.html" class="btn btn-primary mt-3">Volver a la tienda</a>
    </div>
  `;
}

/* ------------------------------------------------------- */
/* 🧭 FUNCIÓN PARA CORREGIR RUTA DE IMAGENES               */
/* ------------------------------------------------------- */
function resolveImagePath(path) {
  if (!path.startsWith("http") && !path.startsWith("../")) {
    if (window.location.pathname.includes("/pages/")) {
      path = "../" + path;
    }
  }
  return path;
}
