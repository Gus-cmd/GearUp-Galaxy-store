import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const p = doc.data();
    container.innerHTML += `
      <div class="product">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <button>Agregar al carrito</button>
      </div>
    `;
  });
}

loadProducts();
