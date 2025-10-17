// ✅ js/products.js
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { localProducts } from "./product-data.js";
import { addToCart, updateCartCountDisplay } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("products-container");
  const loading = document.getElementById("products-loading");

  if (!container) {
    console.error("⚠️ No se encontró el contenedor de productos.");
    return;
  }

  async function loadProducts() {
    if (loading) loading.style.display = "block";
    let allProducts = [];

    try {
      // 🔹 Cargar productos locales
      allProducts = [...localProducts.map(p => ({ ...p, id: String(p.id) }))];

      // 🔹 Cargar productos desde Firebase
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach(doc => {
        allProducts.push({ id: doc.id, ...doc.data() });
      });

      renderProducts(allProducts);
    } catch (error) {
      console.error("❌ Error cargando productos:", error);
      container.innerHTML = `<p class="text-danger text-center">Error al cargar productos.</p>`;
    } finally {
      if (loading) loading.style.display = "none";
    }
  }

  function renderProducts(products) {
    if (!products.length) {
      container.innerHTML = `<p class="text-center text-muted">No hay productos disponibles.</p>`;
      return;
    }

    container.innerHTML = products.map(product => {
      const priceValue = Number(product.price || product.precio || 0);
      const name = product.name || product.nombre || "Producto sin nombre";
      const category = product.category || product.categoria || "Sin categoría";
      const description = product.description || product.descripcion || "";
      const image = product.image || product.imagen || "assets/images/default.png";

      return `
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm product-card">
            <div class="image-container">
              <img src="${image}" class="card-img-top p-2 rounded-3" alt="${name}">
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-semibold text-light">${name}</h5>
              <p class="text-muted small mb-1">${category}</p>
              <p class="card-description text-secondary">${description}</p>
              <h6 class="fw-bold text-info mb-3">S/. ${priceValue.toFixed(2)}</h6>
              <div class="mt-auto d-flex flex-column gap-2">
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                  <i class="fas fa-cart-plus me-2"></i>Añadir al carrito
                </button>
                <a href="pages/product-detail.html?id=${product.id}" class="btn btn-outline-light">
                  Ver Detalles
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", async () => {
        await addToCart(btn.dataset.id);
        updateCartCountDisplay();
      });
    });
  }

  await loadProducts();
});
