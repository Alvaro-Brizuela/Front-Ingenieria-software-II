/* =================================================================
   FUNCIONALIDAD PARA CREAR CONTRATOS
   ================================================================= */

const API_URL = 'https://back-end-fastapi-production.up.railway.app';
let clausulasAgregadas = [];

document.addEventListener('DOMContentLoaded', () => {
    const contratoForm = document.getElementById('contratoForm');
    const btnAgregarClausulaModal = document.getElementById('btnAgregarClausulaModal');
    const selectClausula = document.getElementById('selectClausula');
    const clausulasContainer = document.getElementById('clausulasContainer');
    const noClausulasAlert = document.getElementById('noClausulasAlert');

    // Obtener token del localStorage
    function getToken() {
        return localStorage.getItem('token');
    }

    // Cargar datos de la empresa
    async function cargarDatosEmpresa() {
        try {
            const token = getToken();
            if (!token) {
                alert('No se encontró token de autenticación. Por favor, inicia sesión.');
                window.location.href = '/login.html';
                return;
            }

            const response = await fetch(`${API_URL}/empresa/full`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar datos de la empresa');
            }

            const empresa = await response.json();

            // Rellenar campos de la empresa (readonly y en gris)
            const nombreEmpresa = document.getElementById('nombreEmpresa');
            const rutEmpresa = document.getElementById('rutEmpresa');

            if (nombreEmpresa) {
                nombreEmpresa.value = empresa.nombre_fantasia;
                nombreEmpresa.readOnly = true;
                nombreEmpresa.classList.add('bg-light');
            }

            if (rutEmpresa) {
                rutEmpresa.value = `${empresa.rut_empresa}-${empresa.DV_rut}`;
                rutEmpresa.readOnly = true;
                rutEmpresa.classList.add('bg-light');
            }

        } catch (error) {
            console.error('Error al cargar datos de empresa:', error);
            alert('Error al cargar datos de la empresa');
        }
    }

    // Cargar datos de empresa al iniciar
    cargarDatosEmpresa();

    // Agregar cláusula desde el modal
    if (btnAgregarClausulaModal) {
        btnAgregarClausulaModal.addEventListener('click', () => {
            const clausulaSeleccionada = selectClausula.value;

            if (!clausulaSeleccionada) {
                alert('Por favor, selecciona una cláusula.');
                return;
            }

            // Agregar a la lista
            clausulasAgregadas.push(clausulaSeleccionada);

            // Actualizar UI
            actualizarListaClausulas();

            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('agregarClausulaModal'));
            modal.hide();

            // Resetear select
            selectClausula.value = '';
        });
    }

    // Actualizar lista de cláusulas en la UI
    function actualizarListaClausulas() {
        if (clausulasAgregadas.length === 0) {
            noClausulasAlert.style.display = 'block';
            clausulasContainer.innerHTML = '';
            clausulasContainer.appendChild(noClausulasAlert);
        } else {
            noClausulasAlert.style.display = 'none';
            clausulasContainer.innerHTML = '';

            clausulasAgregadas.forEach((clausula, index) => {
                const clausulaDiv = document.createElement('div');
                clausulaDiv.className = 'alert alert-secondary d-flex justify-content-between align-items-center mb-2';
                clausulaDiv.innerHTML = `
                    <span><strong>Cláusula ${index + 1}:</strong> ${clausula}</span>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminarClausula(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                `;
                clausulasContainer.appendChild(clausulaDiv);
            });
        }
    }

    // Eliminar cláusula
    window.eliminarClausula = function(index) {
        clausulasAgregadas.splice(index, 1);
        actualizarListaClausulas();
    };

    // Enviar formulario y generar PDF
    if (contratoForm) {
        contratoForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Obtener datos del formulario
            const formData = {
                ciudad_firma: document.getElementById('ciudadFirma').value.toUpperCase(),
                fecha_contrato: document.getElementById('fechaContrato').value,
                representante_legal: document.getElementById('representanteLegal').value.toUpperCase(),
                rut_representante: document.getElementById('rutRepresentante').value,
                domicilio_representante: document.getElementById('domicilioRepresentante').value,
                nombre_trabajador: document.getElementById('nombreTrabajador').value.toUpperCase(),
                nacionalidad_trabajador: document.getElementById('nacionalidadTrabajador').value.toUpperCase(),
                rut_trabajador: document.getElementById('rutTrabajador').value,
                estado_civil_trabajador: document.getElementById('estadoCivilTrabajador').value.toUpperCase(),
                fecha_nacimiento_trabajador: document.getElementById('fechaNacimientoTrabajador').value,
                domicilio_trabajador: document.getElementById('domicilioTrabajador').value,
                cargo_trabajador: document.getElementById('cargoTrabajador').value.toUpperCase(),
                lugar_trabajo: document.getElementById('lugarTrabajo').value,
                sueldo: parseInt(document.getElementById('sueldo').value),
                jornada: document.getElementById('jornada').value,
                descripcion_jornada: document.getElementById('descripcionJornada').value,
                clausulas: clausulasAgregadas
            };

            try {
                const token = getToken();
                if (!token) {
                    alert('No se encontró token de autenticación. Por favor, inicia sesión.');
                    window.location.href = '/login.html';
                    return;
                }

                // Mostrar loading
                const btnGenerar = document.getElementById('generarContratoBtn');
                const originalText = btnGenerar.innerHTML;
                btnGenerar.disabled = true;
                btnGenerar.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generando...';

                const response = await fetch(`${API_URL}/contrato/generate-pdf`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
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
                a.download = `contrato_${formData.rut_trabajador}_${new Date().getTime()}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                // Resetear formulario
                contratoForm.reset();
                clausulasAgregadas = [];
                actualizarListaClausulas();

                alert('¡Contrato generado exitosamente!');

                // Restaurar botón
                btnGenerar.disabled = false;
                btnGenerar.innerHTML = originalText;

            } catch (error) {
                console.error('Error:', error);
                alert(`Error al generar el contrato: ${error.message}`);

                // Restaurar botón
                const btnGenerar = document.getElementById('generarContratoBtn');
                btnGenerar.disabled = false;
                btnGenerar.innerHTML = '<i class="bi bi-file-earmark-text-fill"></i> Generar Contrato';
            }
        });
    }
});
