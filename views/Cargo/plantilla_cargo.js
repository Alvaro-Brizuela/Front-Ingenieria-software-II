/* PLANTILA HEADER - SIDE BAR */

const toggleBtn = document.getElementById("toggleSidebar");
const closeBtn = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const body = document.body;

const profileIcon = document.getElementById('profileIcon');
const dropdownMenu = document.getElementById('dropdownMenu');
const userNameDisplay = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

// Mostrar inicial y nombre
function setUserInitial(name) {
    const initial = name.trim().charAt(0).toUpperCase();
    profileIcon.textContent = initial;
    userNameDisplay.textContent = name;
}

// ACÁ VA EL NOMBRE DEL USUARIO
setUserInitial("Felipe Moscoso");

// Abrir/cerrar menú
profileIcon.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

// Ocultar si clic fuera del menú
document.addEventListener('click', (event) => {
    if (
        !profileIcon.contains(event.target) &&
        !dropdownMenu.contains(event.target)
    ) {
        dropdownMenu.classList.remove('show');
    }
});

// Acción de cerrar sesión
logoutBtn.addEventListener('click', () => {
   
    // ACÁ VA LA ACCION DE CERRAR SESIÓN
    alert("Sesión cerrada");
});

// Sidebar toggle
toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
    toggleBtn.classList.add("hide");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
    toggleBtn.classList.remove("hide"); 
});

// CERRAR AL HACER CLICK AFUERA 
document.addEventListener('click', function (event) {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebar');

  // Si el sidebar está abierto y el clic NO fue dentro del sidebar ni en el botón
  if (
    sidebar.classList.contains('show') &&
    !sidebar.contains(event.target) &&
    !toggleBtn.contains(event.target)
  ) {
    sidebar.classList.remove('show');
    toggleBtn.classList.remove('hide');
  }
});


/* FUNCIONES VIEW */

const formCargo = document.getElementById("formCargo");
const listaCargos = document.getElementById("listaCargos");
const nombreInput = document.getElementById("nombreCargo");
const descripcionInput = document.getElementById("descripcionCargo");
const buscadorInput = document.getElementById("buscadorCargo");

let cargos = JSON.parse(localStorage.getItem("cargos")) || [];

// Validar si el nombre ya existe
function validarNombreExistente(nombre) {
  return cargos.some(c => c.nombre.toLowerCase() === nombre.toLowerCase());
}

formCargo.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const descripcion = descripcionInput.value.trim();

  if (!nombre) return;

  if (validarNombreExistente(nombre)) {
    nombreInput.classList.add("is-invalid");
    return;
  }

  nombreInput.classList.remove("is-invalid");

  cargos.push({ nombre, descripcion });
  localStorage.setItem("cargos", JSON.stringify(cargos));

  formCargo.reset();
  actualizarListaCargos();
});

// Renderizar cargos en lista visible
function actualizarListaCargos(filtro = "") {
  listaCargos.innerHTML = "";

  const cargosFiltrados = cargos.filter(c =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (cargosFiltrados.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-center text-muted";
    li.textContent = "No hay cargos registrados.";
    listaCargos.appendChild(li);
    return;
  }

  cargosFiltrados.forEach((cargo, indexOriginal) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center fade-in";

    const span = document.createElement("span");
    span.innerHTML = `${cargo.nombre}<small>${cargo.descripcion}</small>`;

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-sm btn-outline-primary me-2";
    btnEditar.innerHTML = '<i class="bi bi-pencil"></i>';
    btnEditar.onclick = () => {
      nombreInput.value = cargo.nombre;
      descripcionInput.value = cargo.descripcion;

      cargos.splice(indexOriginal, 1);
      localStorage.setItem("cargos", JSON.stringify(cargos));
      actualizarListaCargos(buscadorInput.value);
    };

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-sm btn-outline-danger";
    btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    btnEliminar.onclick = () => {
      if (confirm(`¿Eliminar el cargo "${cargo.nombre}"?`)) {
        li.classList.add("fade-out");
        setTimeout(() => {
          cargos.splice(indexOriginal, 1);
          localStorage.setItem("cargos", JSON.stringify(cargos));
          actualizarListaCargos(buscadorInput.value);
        }, 300);
      }
    };

    const acciones = document.createElement("div");
    acciones.className = "d-flex";
    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    li.appendChild(span);
    li.appendChild(acciones);
    listaCargos.appendChild(li);
  });
}

// Filtro en tiempo real
if (buscadorInput) {
  buscadorInput.addEventListener("input", () => {
    actualizarListaCargos(buscadorInput.value);
  });
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  actualizarListaCargos();
});
