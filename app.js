import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

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

const formulario = document.getElementById("formularioMascota");
const lista = document.getElementById("listaMascotas");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const cuidados = document.getElementById("cuidados").value;
  const fotoInput = document.getElementById("foto");
  const file = fotoInput.files[0];

  let imageUrl = "";
  if (file) {
    const storageRef = ref(storage, "mascotas/" + file.name);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "mascotas"), {
    nombre,
    ubicacion,
    cuidados,
    imagen: imageUrl
  });

  formulario.reset();
  mostrarMascotas();
});

async function mostrarMascotas() {
  lista.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "mascotas"));
  querySnapshot.forEach((doc) => {
    const mascota = doc.data();
    const div = document.createElement("div");
    div.className = "mascota";
    div.innerHTML = `
      <h3>${mascota.nombre}</h3>
      <p><strong>📍 Ubicación:</strong> ${mascota.ubicacion}</p>
      <p><strong>🩺 Cuidados:</strong> ${mascota.cuidados}</p>
      ${mascota.imagen ? `<img src="${mascota.imagen}" alt="Mascota" />` : ""}
    `;
    lista.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", mostrarMascotas);
