// ✅ js/products.js
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { localProducts } from "./product-data.js";
import { addToCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("products-container");
  if (!container) return;

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const firebaseProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const allProducts = [...localProducts, ...firebaseProducts];
    renderProducts(allProducts, container);
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
    container.innerHTML = `<p class="text-center text-danger">Error al cargar los productos.</p>`;
  }
});

// 🖼️ Mostrar productos
function renderProducts(products, container) {
  container.innerHTML = "";

  if (!products || products.length === 0) {
    container.innerHTML = `<p class="text-center text-muted mt-5">No hay productos disponibles.</p>`;
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    card.innerHTML = `
      <div class="card product-card h-100 text-light bg-dark border-0 shadow-sm">
        <img src="${product.imagen || product.image}" class="card-img-top" alt="${product.nombre || product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.nombre || product.name}</h5>
          <p class="text-muted mb-1">${product.categoria || product.category}</p>
          <p class="flex-grow-1">${product.descripcion || product.description || ""}</p>
          <h6 class="fw-bold text-info">S/. ${(product.precio || product.price || 0).toFixed(2)}</h6>
          <div class="mt-2">
            <button class="btn btn-primary w-100 mb-2 add-to-cart" data-id="${product.id}">
              <i class="fas fa-cart-plus me-2"></i>Añadir al carrito
            </button>
            <a href="./pages/product-detail.html?id=${product.id}" class="btn btn-outline-light w-100">
              Ver Detalles
            </a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // 🎯 Activar botones de carrito (con await)
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", async () => await addToCart(btn.dataset.id));
  });
}
