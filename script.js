
import { db, collection, addDoc, getDocs, storage, ref, uploadBytes, getDownloadURL } from './firebase-config.js';

const formulario = document.getElementById('formularioMascota');
const lista = document.getElementById('listaMascotas');

async function cargarMascotas() {
  const querySnapshot = await getDocs(collection(db, "mascotas"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    mostrarMascota(data.nombre, data.ubicacion, data.cuidados, data.fotoURL);
  });
}

function mostrarMascota(nombre, ubicacion, cuidados, fotoURL) {
  const mascotaDiv = document.createElement('div');
  mascotaDiv.className = 'mascota';
  mascotaDiv.innerHTML = \`
    <h3>\${nombre}</h3>
    <p><strong>📍 Ubicación:</strong> \${ubicacion}</p>
    <p><strong>🩺 Cuidados:</strong> \${cuidados}</p>
    <img src="\${fotoURL}" alt="Foto de \${nombre}" />
  \`;
  lista.appendChild(mascotaDiv);
}

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const cuidados = document.getElementById('cuidados').value;
  const file = document.getElementById('foto').files[0];

  if (file) {
    const storageRef = ref(storage, 'mascotas/' + file.name);
    await uploadBytes(storageRef, file);
    const fotoURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, "mascotas"), {
      nombre, ubicacion, cuidados, fotoURL
    });

    mostrarMascota(nombre, ubicacion, cuidados, fotoURL);
    formulario.reset();
  }
});

cargarMascotas();
