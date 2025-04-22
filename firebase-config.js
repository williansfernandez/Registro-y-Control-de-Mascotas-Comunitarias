
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCuFzU5PXe7gt87mK5DYvuvy7k813rCF0",
  authDomain: "mascotas-2404b.firebaseapp.com",
  projectId: "mascotas-2404b",
  storageBucket: "mascotas-2404b.appspot.com",
  messagingSenderId: "514178447311",
  appId: "1:514178447311:web:baf57f0dce52da42a004ba"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, collection, addDoc, getDocs, storage, ref, uploadBytes, getDownloadURL };
