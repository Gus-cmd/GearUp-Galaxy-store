// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// ✅ Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAPcvAPLw0pSW3BlHepBes0PKZSKGIbRA",
  authDomain: "gearup-galaxy-store.firebaseapp.com",
  projectId: "gearup-galaxy-store",
  storageBucket: "gearup-galaxy-store.appspot.com", // ⚠️ corregido el bucket
  messagingSenderId: "468355462145",
  appId: "1:468355462145:web:6f42f8f05497d753447c00"
};

// ✅ Inicializa la app
const app = initializeApp(firebaseConfig);

// ✅ Inicializa servicios
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // 🔹 Inicializamos Storage

// ✅ Exporta correctamente
export { app, db, auth, storage };
