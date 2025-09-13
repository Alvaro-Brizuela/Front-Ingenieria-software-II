document.addEventListener('DOMContentLoaded', function() {

    /* ----- FUNCIONALIDAD DEL SIDEBAR Y HEADER ----- */
    const toggleBtn = document.getElementById("toggleSidebar");
    const closeBtn = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    const profileIcon = document.getElementById('profileIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const userNameDisplay = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');

    // Muestra la inicial y el nombre del usuario en el header.
    function setUserInitial(name) {
        const initial = name.trim().charAt(0).toUpperCase();
        profileIcon.textContent = initial;
        userNameDisplay.textContent = name;
    }

    // Inicializa el nombre del usuario (puedes cambiarlo por el real)
    setUserInitial("Nombre de Prueba");

    // Abre/cierra el menú de usuario al hacer click en el icono de perfil
    profileIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    // Oculta el menú de usuario si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (
            !profileIcon.contains(event.target) &&
            !dropdownMenu.contains(event.target)
        ) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Acción de cerrar sesión (reemplazar por la lógica real)
    logoutBtn.addEventListener('click', () => {
        alert("Sesión cerrada");
    });

    // Abre el sidebar y desplaza el cuerpo de la página
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
        body.classList.add("sidebar-open");
        toggleBtn.classList.add("hide");
    });

    // Cierra el sidebar y devuelve el cuerpo de la página a su lugar
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("show");
        body.classList.remove("sidebar-open");
        toggleBtn.classList.remove("hide"); 
    });

    // Cierra el sidebar si se hace clic fuera de él
    document.addEventListener('click', function (event) {
      if (
        sidebar.classList.contains('show') &&
        !sidebar.contains(event.target) &&
        !toggleBtn.contains(event.target)
      ) {
        sidebar.classList.remove("show");
        body.classList.remove("sidebar-open");
        toggleBtn.classList.remove("hide");
      }
    });

    /* ----- FUNCIONALIDAD DE LA TABLA EPP ----- */
    const addRowBtn = document.getElementById('addRowBtn');
    const tableBody = document.querySelector('#eppTable tbody');

    // Función para agregar una nueva fila
    function addNewRow() {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <input list="epp-names" name="epp-name" class="form-control epp-input" required>
                <datalist id="epp-names">
                    <option value="Casco de seguridad">
                    <option value="Guantes de protección">
                    <option value="Gafas de seguridad">
                    <option value="Mascarilla N95">
                    <option value="Chaleco reflectante">
                    <option value="Botas de seguridad">
                </datalist>
            </td>
            <td><input type="number" min="1" class="form-control quantity-input" required></td>
            <td><input type="date" class="form-control date-input" required></td>
            <td>
              <button type="button" class="btn btn-danger btn-sm delete-row-btn">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </td>
        `;
        tableBody.appendChild(newRow);
    }
    
    // Función para eliminar la fila
    function deleteRow(event) {
        const button = event.target.closest('.delete-row-btn');
        if (button) {
            const row = button.closest('tr');
            if (row) {
                row.remove();
            }
        }
    }

    // Event Listeners
    if (addRowBtn) {
        addRowBtn.addEventListener('click', addNewRow);
    } else {
        console.error("Error: No se encontró el botón con el ID 'addRowBtn'.");
    }

    tableBody.addEventListener('click', deleteRow);
});