// js/script.js
import { updateCartCountDisplay } from "./cart.js";
import { updateCartCountDisplay } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  if (typeof updateCartCountDisplay === "function") {
    updateCartCountDisplay();
  }

  // Animación suave al hacer scroll a productos
  const productLink = document.querySelector('a[href="#products-section"]');
  if (productLink) {
    productLink.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("#products-section").scrollIntoView({ behavior: "smooth" });
    });
  }
});
