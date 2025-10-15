// js/auth.js
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// 🔹 Registrar usuario
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Registro exitoso ✅");
    window.location.href = "login.html";
    return userCredential.user;
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("Error al registrar: " + error.message);
  }
}

// 🔹 Iniciar sesión
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Inicio de sesión exitoso 🚀");
    window.location.href = "../index.html";
    return userCredential.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Error al iniciar sesión: " + error.message);
  }
}

// 🔹 Cerrar sesión
export async function logoutUser() {
  try {
    await signOut(auth);
    alert("Sesión cerrada correctamente 👋");
    window.location.href = "pages/login.html";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

// 🔹 Detectar usuario activo
export function detectUserState(callback) {
  onAuthStateChanged(auth, callback);
}

export { auth };
