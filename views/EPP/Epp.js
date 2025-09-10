document.addEventListener('DOMContentLoaded', function() {
    /* ----- ACÁ FUNCIONALIDAD DEL SIDEBAR Y HEADER ----- */
    const toggleBtn = document.getElementById("toggleSidebar");
    const closeBtn = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    const profileIcon = document.getElementById('profileIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const userNameDisplay = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');

    // ACÁ Mostrar inicial y nombre
    function setUserInitial(name) {
        const initial = name.trim().charAt(0).toUpperCase();
        profileIcon.textContent = initial;
        userNameDisplay.textContent = name;
    }

    // ACÁ VA EL NOMBRE DEL USUARIO
    setUserInitial("Felipe Moscoso");

    // ACÁ Abrir/cerrar menú
    profileIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    // ACÁ Ocultar si clic fuera del menú
    document.addEventListener('click', (event) => {
        if (
            !profileIcon.contains(event.target) &&
            !dropdownMenu.contains(event.target)
        ) {
            dropdownMenu.classList.remove('show');
        }
    });

    // ACÁ Acción de cerrar sesión
    logoutBtn.addEventListener('click', () => {
       
        // ACÁ VA LA ACCION DE CERRAR SESIÓN
        alert("Sesión cerrada");
    });

    // ACÁ Sidebar toggle
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
        toggleBtn.classList.add("hide");
    });

    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("show");
        toggleBtn.classList.remove("hide"); 
    });

    // ACÁ CERRAR AL HACER CLICK AFUERA 
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


    /* ----- ACÁ FUNCIONALIDAD DE LA TABLA EPP ----- */
    const addRowBtn = document.getElementById('addRowBtn');
    const tableBody = document.querySelector('#eppTable tbody');

    // ACÁ Función para agregar una nueva fila
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
    
    // ACÁ Función para eliminar la fila
    function deleteRow(event) {
        // Asegúrate de que el clic fue en el botón o el ícono
        const button = event.target.closest('.delete-row-btn');
        if (button) {
            const row = button.closest('tr'); // Encuentra la fila más cercana
            if (row) {
                row.remove(); // Elimina la fila
            }
        }
    }

    // ACÁ Event Listeners
    if (addRowBtn) {
        addRowBtn.addEventListener('click', addNewRow);
    } else {
        console.error("Error: No se encontró el botón con el ID 'addRowBtn'.");
    }

    // Usamos delegación de eventos para los botones de eliminar
    tableBody.addEventListener('click', deleteRow);
});