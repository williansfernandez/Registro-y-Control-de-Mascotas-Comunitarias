import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

const form = document.getElementById('formularioMascota');
const lista = document.getElementById('listaMascotas');

async function cargarMascotas() {
  const snapshot = await getDocs(collection(db, "mascotas"));
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.className = 'mascota';
    div.innerHTML = `
      <h3>${data.nombre}</h3>
      <p><strong>📍 Ubicación:</strong> ${data.ubicacion}</p>
      <p><strong>🩺 Cuidados:</strong> ${data.cuidados}</p>
      <img src="${data.imagenURL}" />
    `;
    lista.appendChild(div);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const cuidados = document.getElementById('cuidados').value;
  const foto = document.getElementById('foto').files[0];

  const storageRef = ref(storage, `mascotas/${Date.now()}_${foto.name}`);
  await uploadBytes(storageRef, foto);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "mascotas"), {
    nombre, ubicacion, cuidados, imagenURL: url
  });

  form.reset();
  lista.innerHTML = "";
  cargarMascotas();
});

window.addEventListener('DOMContentLoaded', cargarMascotas);
