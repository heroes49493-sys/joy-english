// Joy English ☀️ — sincronización con Firebase (Google Sign-In + Firestore)
//
// Módulo ES aparte (se importa vía CDN, sin build/npm) porque js/app.js es un
// script clásico (un único IIFE) y el SDK de Firebase v9+ solo se distribuye
// como módulos ES. En vez de convertir toda la app a módulos, este archivo
// hace su trabajo y expone una API mínima en `window.JoyCloud` para que
// app.js la use tal cual, sin volverse él mismo un módulo.
//
// El firebaseConfig de abajo NO es secreto — está pensado para viajar al
// navegador (la seguridad real la dan las reglas de Firestore, configuradas
// en la consola de Firebase, no esta clave). Por eso puede vivir en el repo
// público sin problema, a diferencia de la key de Gemini (esa sí es secreta
// y vive gitignored en config.json).

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDS4tdWfB6tf0hA8sB0PNCiQNotp4M9sFw",
  authDomain: "joy-english-d92f0.firebaseapp.com",
  projectId: "joy-english-d92f0",
  storageBucket: "joy-english-d92f0.firebasestorage.app",
  messagingSenderId: "413847449586",
  appId: "1:413847449586:web:dc8325a5eacfa7b359856b",
  measurementId: "G-MRPT5RJTKG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Intenta popup primero (da un error claro e inmediato si algo falla: dominio
// no autorizado, popup bloqueado, etc.) y si el navegador no lo soporta bien
// (típico en PWA instalada / modo standalone en iOS), cae a signInWithRedirect.
window.JoyCloud = {
  async signIn() {
    try {
      return await signInWithPopup(auth, provider);
    } catch (err) {
      // El usuario cerró el popup o lo canceló a propósito: no es un error real.
      if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") {
        return null;
      }
      // El navegador no soporta popups bien (típico en PWA instalada/standalone
      // en iOS) o el popup fue bloqueado: caer a redirect.
      if (err.code === "auth/popup-blocked" || err.code === "auth/operation-not-supported-in-this-environment") {
        console.warn("Joy English — popup falló, probando redirect:", err.code);
        return signInWithRedirect(auth, provider);
      }
      throw err;
    }
  },
  signOutUser() {
    return signOut(auth);
  },
  onAuthChange(cb) {
    return onAuthStateChanged(auth, cb);
  },
  async loadState(uid) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data().state : null;
  },
  async saveState(uid, state) {
    await setDoc(doc(db, "users", uid), { state, updatedAt: serverTimestamp() });
  }
};

// Al volver de un signInWithRedirect, Firebase necesita esta llamada para
// completar el login (no hace falta usar su resultado: onAuthStateChanged
// ya se dispara solo con el usuario). Solo atrapa errores para no romper nada.
getRedirectResult(auth).catch((err) => {
  console.warn("Joy English — error al volver del login de Google:", err);
});

// app.js es un script clásico que puede ejecutarse ANTES de que este módulo
// termine de cargar (los <script type="module"> se difieren por spec). Avisa
// cuando window.JoyCloud ya está listo para usarse.
window.dispatchEvent(new CustomEvent("joycloud-ready"));
