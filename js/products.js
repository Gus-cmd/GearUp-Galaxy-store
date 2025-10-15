import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

async function loadProducts() {
  const container = document.getElementById("products-container");
  if (!container) {
    console.error("No se encontró el contenedor de productos (#products-container)");
    return;
  }

  container.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (querySnapshot.empty) {
      container.innerHTML = "<p class='text-center'>No hay productos disponibles por ahora.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const p = doc.data();
      container.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${p.imagen || 'assets/images/default.png'}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body text-center">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text">$${p.precio}</p>
              <button class="btn btn-primary">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    container.innerHTML = "<p class='text-danger text-center'>Error al cargar productos.</p>";
  }
}

loadProducts();
