// js/products.js
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { localProducts } from "./product-data.js";
import { addToCart, updateCartCountDisplay } from "./cart.js";

// ✅ Función principal
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("products-container");
  if (!container) {
    console.error("⚠️ No se encontró el contenedor #products-container");
    return;
  }

  async function loadProducts() {
    container.innerHTML = `<p class="text-center">Cargando productos...</p>`;

    try {
      // 🔹 Cargar productos desde Firebase
      const querySnapshot = await getDocs(collection(db, "products"));
      let firebaseProducts = [];

      querySnapshot.forEach((doc) => {
        firebaseProducts.push({ id: doc.id, ...doc.data() });
      });

      // 🔹 Unir productos locales y de Firebase (si hay)
      const allProducts = [...(localProducts || []), ...(firebaseProducts || [])];

      // 🔸 Si no hay productos
      if (allProducts.length === 0) {
        container.innerHTML = `<p class="text-center">No hay productos disponibles.</p>`;
        return;
      }

      renderProducts(allProducts);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
      container.innerHTML = `<p class="text-danger text-center">Error al cargar productos.</p>`;
    }
  }

  // ✅ Renderizar productos en tarjetas
  function renderProducts(products) {
    container.innerHTML = products
      .map((product) => {
        const id = product.id || "";
        const name = product.name || product.nombre || "Producto sin nombre";
        const category = product.category || product.categoria || "Sin categoría";
        const description = product.description || product.descripcion || "Sin descripción";
        const image = product.image || product.imagen || "assets/images/default.png";
        const price = product.price ?? product.precio ?? 0; // 🔹 Previene undefined

        return `
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm product-card">
              <a href="pages/product-detail.html?id=${id}" class="text-decoration-none text-dark">
                <img src="${image}" class="card-img-top" alt="${name}">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text text-muted small">${category}</p>
                  <p class="card-text">${description.substring(0, 70)}...</p>
                  <h6 class="fw-bold text-success">S/. ${Number(price).toFixed(2)}</h6>
                </div>
              </a>
              <div class="card-footer bg-transparent border-top-0 text-center">
                <button class="btn btn-primary add-to-cart-btn" data-id="${id}">
                  <i class="fas fa-cart-plus me-2"></i>Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    // Añadir eventos a los botones
    const buttons = container.querySelectorAll(".add-to-cart-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        addToCart(id);
        updateCartCountDisplay(); // Actualiza contador del carrito
      });
    });
  }

  // Ejecutar carga
  await loadProducts();
});
