const API_URL = 'https://back-end-fastapi-production.up.railway.app';
let availableEPPs = [];
let selectedWorker = null;

document.addEventListener('DOMContentLoaded', function() {
    /* PLANTILLA HEADER - SIDE BAR */

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
        body.classList.add("show");
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

/* ----- FIN DEL CÓDIGO DEL SIDEBAR ----- */

    // Cargar EPPs al inicio
    loadEPPs();
});

// Función para cargar los EPPs disponibles
async function loadEPPs() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_URL}/epp/list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            availableEPPs = await response.json();
        } else {
            console.error('Error al cargar EPPs');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para buscar trabajadores
async function searchWorkers() {
    const searchType = document.querySelector('input[name="searchType"]:checked').id;
    const token = localStorage.getItem('access_token');

    let endpoint = '';
    let queryParams = '';

    if (searchType === 'searchByRut') {
        const rut = document.getElementById('rutInput').value.trim();
        if (!rut) {
            alert('Ingrese un RUT para buscar');
            return;
        }
        endpoint = '/trabajadores/search-by-rut';
        queryParams = `?rut=${rut}`;
    } else {
        const nombre = document.getElementById('nombreInput').value.trim();
        const apellidoPaterno = document.getElementById('apellidoPaternoInput').value.trim();
        const apellidoMaterno = document.getElementById('apellidoMaternoInput').value.trim();

        if (!nombre && !apellidoPaterno && !apellidoMaterno) {
            alert('Ingrese al menos un dato para buscar');
            return;
        }

        endpoint = '/trabajadores/search';
        const params = new URLSearchParams();
        if (nombre) params.append('nombre', nombre);
        if (apellidoPaterno) params.append('apellido_paterno', apellidoPaterno);
        if (apellidoMaterno) params.append('apellido_materno', apellidoMaterno);
        queryParams = `?${params.toString()}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const workers = await response.json();
            displaySearchResults(workers);
        } else {
            alert('No se encontraron trabajadores');
            document.getElementById('searchResults').innerHTML = '';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al buscar trabajadores');
    }
}

// Función para mostrar los resultados de la búsqueda
function displaySearchResults(workers) {
    const resultsTable = document.getElementById('searchResults');

    if (!workers || workers.length === 0) {
        resultsTable.innerHTML = '<tr><td colspan="5" class="text-center">No se encontraron trabajadores</td></tr>';
        return;
    }

    resultsTable.innerHTML = workers.map(worker => `
        <tr>
            <td>${worker.datos_trabajador.rut}-${worker.datos_trabajador.DV_rut}</td>
            <td>${worker.datos_trabajador.nombre}</td>
            <td>${worker.datos_trabajador.apellido_paterno}</td>
            <td>${worker.datos_trabajador.apellido_materno}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick='selectWorker(${JSON.stringify(worker)})'>
                    Seleccionar
                </button>
            </td>
        </tr>
    `).join('');
}

// Función para seleccionar un trabajador
function selectWorker(worker) {
    selectedWorker = worker;

    // Ocultar resultados de búsqueda y mostrar datos del trabajador
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('workerDataSection').style.display = 'block';

    // Llenar los datos del trabajador
    document.getElementById('displayRut').textContent = `${worker.datos_trabajador.rut}-${worker.datos_trabajador.DV_rut}`;
    document.getElementById('displayNombre').textContent = worker.datos_trabajador.nombre;
    document.getElementById('displayApellidoPaterno').textContent = worker.datos_trabajador.apellido_paterno;
    document.getElementById('displayApellidoMaterno').textContent = worker.datos_trabajador.apellido_materno;
    document.getElementById('displayCargo').textContent = worker.cargo ? worker.cargo.nombre_cargo : 'Sin cargo';

    // Limpiar tabla de EPPs y agregar primera fila
    document.querySelector('#eppTable tbody').innerHTML = '';
    addEppRow();
}

// Función para agregar una fila de EPP
function addEppRow() {
    const tableBody = document.querySelector('#eppTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>
            <select class="form-control epp-select" required onchange="updateEppOptions()">
                <option value="">Seleccione un EPP</option>
            </select>
        </td>
        <td><input type="number" min="1" class="form-control quantity-input" required></td>
        <td><input type="date" class="form-control date-input" required></td>
        <td>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeEppRow(this)">
                <i class="bi bi-trash3-fill"></i>
            </button>
        </td>
    `;

    tableBody.appendChild(newRow);
    updateEppOptions();
}

// Función para actualizar las opciones de EPP en todos los selects
function updateEppOptions() {
    const allSelects = document.querySelectorAll('.epp-select');
    const selectedEppIds = Array.from(allSelects)
        .map(select => select.value)
        .filter(value => value !== '');

    allSelects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Seleccione un EPP</option>';

        availableEPPs.forEach(epp => {
            // Mostrar el EPP si no está seleccionado en otro select o si es el valor actual de este select
            if (!selectedEppIds.includes(String(epp.id_epp)) || String(epp.id_epp) === currentValue) {
                const option = document.createElement('option');
                option.value = epp.id_epp;
                option.textContent = epp.nombre_epp;
                select.appendChild(option);
            }
        });

        // Restaurar el valor seleccionado
        if (currentValue) {
            select.value = currentValue;
        }
    });
}

// Función para eliminar una fila de EPP
function removeEppRow(button) {
    const row = button.closest('tr');
    row.remove();
    updateEppOptions();
}

// Función para generar el PDF de EPP
async function GeneratePDFEPP() {
    if (!selectedWorker) {
        alert('Debe seleccionar un trabajador primero');
        return;
    }

    const submitButton = document.getElementById('generatePdfBtn');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Generando...';

    // Recopilar datos de EPPs
    const eppRows = document.querySelectorAll('#eppTable tbody tr');
    const eppList = [];

    for (let row of eppRows) {
        const eppId = row.querySelector('.epp-select').value;
        const quantity = row.querySelector('.quantity-input').value;
        const date = row.querySelector('.date-input').value;

        if (!eppId || !quantity || !date) {
            alert('Complete todos los campos de EPP');
            submitButton.disabled = false;
            submitButton.innerHTML = 'Generar PDF';
            return;
        }

        eppList.push({
            id_epp: parseInt(eppId),
            cantidad: parseInt(quantity),
            fecha_entrega: date
        });
    }

    const data = {
        rut: String(selectedWorker.datos_trabajador.rut),
        epp_list: eppList
    };

    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_URL}/epp/generate-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `epp_entrega_${selectedWorker.datos_trabajador.rut}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            alert('PDF generado correctamente');
        } else {
            const error = await response.json();
            alert(`Error: ${error.detail || 'Error al generar el PDF'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al generar el PDF');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Generar PDF';
    }
}
