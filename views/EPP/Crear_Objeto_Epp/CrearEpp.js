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

      if (
        sidebar.classList.contains('show') &&
        !sidebar.contains(event.target) &&
        !toggleBtn.contains(event.target)
      ) {
        sidebar.classList.remove('show');
        toggleBtn.classList.remove('hide');
      }
    });


    /* ----- FUNCIONALIDAD DE LA TABLA DE CREACIÓN DE EPP ----- */
    const addRowBtn = document.getElementById('addRowBtn');
    const saveBtn = document.getElementById('saveBtn');
    const tableBody = document.querySelector('#eppCreationTable tbody');

    // Función para agregar una nueva fila
    function addNewRow() {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="form-control epp-name-input" required></td>
            <td><input type="text" class="form-control epp-description-input" required></td>
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

    // Función para guardar los datos
    function saveData() {
        const rows = document.querySelectorAll('#eppCreationTable tbody tr');
        const eppData = [];
        let formIsValid = true;

        rows.forEach(row => {
            const nameInput = row.querySelector('.epp-name-input');
            const descriptionInput = row.querySelector('.epp-description-input');

            if (!nameInput.value || !descriptionInput.value) {
                formIsValid = false;
                alert("Por favor, complete todos los campos antes de guardar.");
                return;
            }

            eppData.push({
                nombre: nameInput.value,
                descripcion: descriptionInput.value
            });
        });

        if (formIsValid) {
            // Aquí puedes enviar los datos (eppData) a tu backend
            console.log("Datos de EPP a guardar:", eppData);

            // Ejemplo de cómo se vería una llamada a una API
            /*
            fetch('/api/epps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eppData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('EPP guardados correctamente!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ocurrió un error al guardar los EPP.');
            });
            */
            alert('¡EPP listos para ser guardados!');
        }
    }

    // Event Listeners
    if (addRowBtn) {
        addRowBtn.addEventListener('click', addNewRow);
    } else {
        console.error("Error: No se encontró el botón con el ID 'addRowBtn'.");
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', saveData);
    } else {
        console.error("Error: No se encontró el botón con el ID 'saveBtn'.");
    }

    // Usamos delegación de eventos para los botones de eliminar
    tableBody.addEventListener('click', deleteRow);
});