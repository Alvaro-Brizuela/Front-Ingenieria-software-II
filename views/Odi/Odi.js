document.addEventListener('DOMContentLoaded', () => {

    const nombreInput = document.getElementById('nombre');
    const apellidoPaternoInput = document.getElementById('apellidoPaterno');
    const apellidoMaternoInput = document.getElementById('apellidoMaterno');

    // Función para validar que solo se puedan ingresar letras
    function validarSoloLetras(event) {
        const esNumero = /[0-9]/.test(event.key);
        if (esNumero) {
            event.preventDefault();
        }
    }

    // Obtener referencias a los elementos necesarios
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const closeSidebar = document.getElementById('closeSidebar');

    // Al hacer clic en el botón de abrir, se agrega la clase que desplaza el texto
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', () => {
            body.classList.add('sidebar-open');
        });
    }

    // Al hacer clic en el botón de cerrar, se quita la clase que desplaza el texto
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            body.classList.remove('sidebar-open');
        });
    }

    // Lógica para cuando se cierra tocando afuera
    if (sidebar) {
        sidebar.addEventListener('transitionend', () => {
            if (!sidebar.classList.contains('show')) {
                body.classList.remove('sidebar-open');
            }
        });
    }

    // Agregar el evento a los campos de nombre y apellidos
    nombreInput.addEventListener('keypress', validarSoloLetras);
    apellidoPaternoInput.addEventListener('keypress', validarSoloLetras);
    apellidoMaternoInput.addEventListener('keypress', validarSoloLetras);

    const agregarFilaBtn = document.getElementById('agregarFilaBtn');
    const odiTableBody = document.getElementById('odiTableBody');
    const descargarPdfBtn = document.getElementById('descargarPdfBtn');
    const crearOdiBtn = document.getElementById('crearOdiBtn');
    const btnGuardarOdi = document.getElementById('btnGuardarOdi');

    // Array para almacenar las actividades ODI
    let actividadesODI = [];

    // Configuración de la API
    const API_BASE_URL = 'https://back-end-fastapi-production.up.railway.app';

    // Función para obtener el token del localStorage
    function getAuthToken() {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('No se encontró el token de autenticación');
            alert('No se encontró el token de autenticación. Por favor, inicie sesión nuevamente.');
            return null;
        }
        return token;
    }

    // Función para obtener headers con autenticación
    function getAuthHeaders() {
        const token = getAuthToken();
        if (!token) return null;
        
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    // Función para cargar actividades desde la API
    async function cargarActividadesODI() {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;

            const response = await fetch(`${API_BASE_URL}/odi/list`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Mapear los datos de la API al formato interno
            actividadesODI = data.map(odi => ({
                id: odi.id_odi,
                actividad: odi.tarea,
                peligros: odi.riesgo,
                consecuencias: odi.consecuencias,
                medidas: odi.precaucion
            }));
            
            console.log('Actividades ODI cargadas:', actividadesODI);
        } catch (error) {
            console.error('Error al cargar actividades ODI:', error);
            alert('Error al cargar las actividades ODI. Por favor, verifique su conexión.');
        }
    }

    // Cargar actividades al iniciar
    cargarActividadesODI();

    // Función para crear el select de actividades
    function crearSelectActividad() {
        const select = document.createElement('select');
        select.className = 'form-control select-actividad';
        
        // Opción por defecto
        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.textContent = 'Seleccione una actividad...';
        select.appendChild(optionDefault);
        
        // Agregar opciones desde el array de actividades
        actividadesODI.forEach(odi => {
            const option = document.createElement('option');
            option.value = odi.id;
            option.textContent = odi.actividad;
            option.dataset.peligros = odi.peligros;
            option.dataset.consecuencias = odi.consecuencias;
            option.dataset.medidas = odi.medidas;
            select.appendChild(option);
        });
        
        return select;
    }

    // Agregar fila con select y autocompletado
    agregarFilaBtn.addEventListener('click', () => {
        const nuevaFila = document.createElement('tr');
        
        const tdActividad = document.createElement('td');
        const selectActividad = crearSelectActividad();
        tdActividad.appendChild(selectActividad);
        
        const tdPeligros = document.createElement('td');
        const textareaPeligros = document.createElement('textarea');
        textareaPeligros.className = 'form-control textarea-peligros';
        textareaPeligros.rows = 3;
        textareaPeligros.readOnly = true;
        tdPeligros.appendChild(textareaPeligros);
        
        const tdConsecuencias = document.createElement('td');
        const textareaConsecuencias = document.createElement('textarea');
        textareaConsecuencias.className = 'form-control textarea-consecuencias';
        textareaConsecuencias.rows = 3;
        textareaConsecuencias.readOnly = true;
        tdConsecuencias.appendChild(textareaConsecuencias);
        
        const tdMedidas = document.createElement('td');
        const textareaMedidas = document.createElement('textarea');
        textareaMedidas.className = 'form-control textarea-medidas';
        textareaMedidas.rows = 3;
        textareaMedidas.readOnly = true;
        tdMedidas.appendChild(textareaMedidas);
        
        const tdAcciones = document.createElement('td');
        tdAcciones.className = 'text-center';
        tdAcciones.innerHTML = `
            <button class="btn btn-danger btn-sm eliminar-fila">
                <i class="bi bi-trash"></i>
            </button>
        `;
        
        nuevaFila.appendChild(tdActividad);
        nuevaFila.appendChild(tdPeligros);
        nuevaFila.appendChild(tdConsecuencias);
        nuevaFila.appendChild(tdMedidas);
        nuevaFila.appendChild(tdAcciones);
        
        // Evento para autocompletar cuando se selecciona una actividad
        selectActividad.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value) {
                textareaPeligros.value = selectedOption.dataset.peligros || '';
                textareaConsecuencias.value = selectedOption.dataset.consecuencias || '';
                textareaMedidas.value = selectedOption.dataset.medidas || '';
            } else {
                textareaPeligros.value = '';
                textareaConsecuencias.value = '';
                textareaMedidas.value = '';
            }
        });
        
        odiTableBody.appendChild(nuevaFila);
    });

    // Escuchar los clics en la tabla para manejar el botón de eliminar
    odiTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('eliminar-fila') || event.target.closest('.eliminar-fila')) {
            const fila = event.target.closest('tr');
            fila.remove();
        }
    });

    // Modal para crear ODI
    const crearOdiModal = new bootstrap.Modal(document.getElementById('crearOdiModal'));

    crearOdiBtn.addEventListener('click', () => {
        // Limpiar el formulario
        document.getElementById('formCrearOdi').reset();
        crearOdiModal.show();
    });

    // Guardar nueva actividad ODI
    btnGuardarOdi.addEventListener('click', async () => {
        const actividad = document.getElementById('modalActividad').value.trim();
        const peligros = document.getElementById('modalPeligros').value.trim();
        const consecuencias = document.getElementById('modalConsecuencias').value.trim();
        const medidas = document.getElementById('modalMedidas').value.trim();

        // Validación
        if (!actividad || !peligros || !consecuencias || !medidas) {
            alert('Por favor, complete todos los campos obligatorios');
            return;
        }

        try {
            const headers = getAuthHeaders();
            if (!headers) return;

            // Deshabilitar el botón mientras se procesa
            btnGuardarOdi.disabled = true;
            btnGuardarOdi.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creando...';

            const response = await fetch(`${API_BASE_URL}/odi/create`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    tarea: actividad,
                    riesgo: peligros,
                    consecuencias: consecuencias,
                    precaucion: medidas
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al crear la actividad ODI');
            }

            const nuevaActividad = await response.json();

            // Agregar la nueva actividad al array local
            actividadesODI.push({
                id: nuevaActividad.id_odi,
                actividad: nuevaActividad.tarea,
                peligros: nuevaActividad.riesgo,
                consecuencias: nuevaActividad.consecuencias,
                medidas: nuevaActividad.precaucion
            });

            // Mostrar mensaje de éxito
            alert('Actividad ODI creada exitosamente');

            // Cerrar el modal
            crearOdiModal.hide();

            // Limpiar el formulario
            document.getElementById('formCrearOdi').reset();

            // Actualizar los selects existentes en la tabla
            actualizarSelectsExistentes();

        } catch (error) {
            console.error('Error al crear actividad ODI:', error);
            alert(`Error al crear la actividad ODI: ${error.message}`);
        } finally {
            // Rehabilitar el botón
            btnGuardarOdi.disabled = false;
            btnGuardarOdi.innerHTML = '<i class="bi bi-check-circle"></i> Crear';
        }
    });

    // Función para actualizar todos los selects existentes en la tabla
    function actualizarSelectsExistentes() {
        const selects = document.querySelectorAll('.select-actividad');
        selects.forEach(select => {
            const valorActual = select.value;
            
            // Limpiar opciones existentes
            select.innerHTML = '';
            
            // Opción por defecto
            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Seleccione una actividad...';
            select.appendChild(optionDefault);
            
            // Agregar todas las opciones actualizadas
            actividadesODI.forEach(odi => {
                const option = document.createElement('option');
                option.value = odi.id;
                option.textContent = odi.actividad;
                option.dataset.peligros = odi.peligros;
                option.dataset.consecuencias = odi.consecuencias;
                option.dataset.medidas = odi.medidas;
                select.appendChild(option);
            });
            
            // Restaurar el valor seleccionado si existe
            if (valorActual) {
                select.value = valorActual;
            }
        });
    }

    // Lógica para descargar PDF usando la API
    descargarPdfBtn.addEventListener('click', async () => {
        try {
            // Validar campos del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const apellidoPaterno = document.getElementById('apellidoPaterno').value.trim();
            const apellidoMaterno = document.getElementById('apellidoMaterno').value.trim();
            const rut = document.getElementById('rut').value.trim();
            const cargo = document.getElementById('cargo').value.trim();

            if (!nombre || !apellidoPaterno || !apellidoMaterno || !rut || !cargo) {
                alert('Por favor, complete todos los datos del trabajador antes de generar el PDF');
                return;
            }

            // Obtener los IDs de los ODIs seleccionados en la tabla
            const selects = document.querySelectorAll('.select-actividad');
            const elementos = [];
            
            selects.forEach(select => {
                if (select.value) {
                    elementos.push(parseInt(select.value));
                }
            });

            if (elementos.length === 0) {
                alert('Por favor, agregue al menos una actividad antes de generar el PDF');
                return;
            }

            const headers = getAuthHeaders();
            if (!headers) return;

            // Deshabilitar el botón mientras se procesa
            descargarPdfBtn.disabled = true;
            descargarPdfBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Generando PDF...';

            // Construir el nombre completo
            const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;

            const response = await fetch(`${API_BASE_URL}/odi/generate-pdf`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    nombre: nombreCompleto,
                    rut: rut,
                    cargo: cargo,
                    empresa_nombre: "", // lo pone la api
                    empresa_rut: "", // lo pone la api
                    elementos: elementos
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al generar el PDF');
            }

            // Descargar el PDF
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ODI_${rut.replace('-', '')}_${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            alert('PDF generado exitosamente');

        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert(`Error al generar el PDF: ${error.message}`);
        } finally {
            // Rehabilitar el botón
            descargarPdfBtn.disabled = false;
            descargarPdfBtn.innerHTML = 'Descargar PDF';
        }
    });

});