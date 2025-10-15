// Importa los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAPcvAPLw0pSW3BlHepBes0PKZSKGIbRA",
  authDomain: "gearup-galaxy-store.firebaseapp.com",
  projectId: "gearup-galaxy-store",
  storageBucket: "gearup-galaxy-store.firebasestorage.app",
  messagingSenderId: "468355462145",
  appId: "1:468355462145:web:6f42f8f05497d753447c00"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar la base de datos
export { db };
