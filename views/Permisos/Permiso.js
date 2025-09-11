document.addEventListener('DOMContentLoaded', () => {

    const nombreInput = document.getElementById('nombre');

        nombreInput.addEventListener('keypress', (event) => {
        // Expresión regular para verificar si el carácter es un número del 0 al 9
        const esNumero = /[0-9]/.test(event.key);

        if (esNumero) {
            event.preventDefault(); // Detiene el evento y no permite escribir el número
        }
});

    const form = document.getElementById('permisoForm');
    const descargarBtn = document.getElementById('descargarBtn');
    const tablaBody = document.querySelector('#solicitudesTable tbody');

    // ----------------------------------------------------
    // LÓGICA DE GESTIÓN DE LA TABLA
    // ----------------------------------------------------

    // Función para añadir una solicitud a la tabla
    function agregarSolicitudATabla(solicitud) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${solicitud.nombre}</td>
            <td>${solicitud.periodo}</td>
            <td><span class="badge bg-warning text-dark">${solicitud.estado}</span></td>
            <td>
                <button class="btn btn-success btn-sm aceptar-btn">
                    <i class="bi bi-check-lg"></i> Aceptar
                </button>
                <button class="btn btn-danger btn-sm rechazar-btn">
                    <i class="bi bi-x-lg"></i> Rechazar
                </button>
            </td>
        `;
        tablaBody.appendChild(fila);

        const aceptarBtn = fila.querySelector('.aceptar-btn');
        const rechazarBtn = fila.querySelector('.rechazar-btn');

        // Lógica para aceptar una solicitud
        aceptarBtn.addEventListener('click', () => {
            const confirmacion = confirm('¿Se ha subido la solicitud firmada a gestión documental?');
            if (confirmacion) {
                // Si el usuario confirma, cambia el estado y lanza la lógica de backend
                fila.querySelector('td:nth-child(3)').innerHTML = '<span class="badge bg-success">Aceptado</span>';
                aceptarBtn.disabled = true;
                rechazarBtn.disabled = true;

                // Lógica de backend
                // Aquí va la lógica para enviar los datos de la solicitud aceptada al backend
                // Por ejemplo:
                // fetch('/api/aceptar-permiso', { method: 'POST', body: JSON.stringify(solicitud) });
                alert('Solicitud aceptada y enviada al backend.');

            } else {
                // Si no confirma, la solicitud permanece en pendiente
                alert('Solicitud queda en estado pendiente.');
            }
        });

        // Lógica para rechazar una solicitud
        rechazarBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres rechazar esta solicitud?')) {
                // Si el usuario confirma, cambia el estado y lanza la lógica de backend
                fila.querySelector('td:nth-child(3)').innerHTML = '<span class="badge bg-danger">Rechazado</span>';
                aceptarBtn.disabled = true;
                rechazarBtn.disabled = true;
                
                // Lógica de backend
                // Aquí va la lógica para enviar los datos de la solicitud rechazada al backend
                // Por ejemplo:
                // fetch('/api/rechazar-permiso', { method: 'POST', body: JSON.stringify(solicitud) });
                alert('Solicitud rechazada.');
            }
        });
    }

    // ----------------------------------------------------
    // LÓGICA PARA EL FORMULARIO
    // ----------------------------------------------------


    // Escuchar el evento de envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaTermino = document.getElementById('fechaTermino').value;

        // Validar que las fechas no estén vacías
        if (!fechaInicio || !fechaTermino) {
            alert('Por favor, completa todas las fechas.');
            return;
        }

        // Crear objeto de solicitud para la tabla
        const nuevaSolicitud = {
            nombre: datosUsuario.nombre,
            periodo: `${fechaInicio} a ${fechaTermino}`,
            estado: 'Pendiente',
            // Puedes añadir más datos como el tipo de permiso aquí si es necesario
        };

        agregarSolicitudATabla(nuevaSolicitud);
        
        // Limpiar formulario
        form.reset();
        document.getElementById('nombre').value = datosUsuario.nombre;
        document.getElementById('rut').value = datosUsuario.rut;

        alert('Solicitud enviada correctamente. Espera la aprobación.');
    });

    // ----------------------------------------------------
    // LÓGICA PARA DESCARGAR PDF
    // ----------------------------------------------------

    descargarBtn.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        const rut = document.getElementById('rut').value;
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaTermino = document.getElementById('fechaTermino').value;
        const tipoPermiso = document.title; // Título de la página: "Permiso Con/Sin Goce de Sueldo"

        // Validar que las fechas no estén vacías
        if (!fechaInicio || !fechaTermino) {
            alert('Por favor, completa las fechas para descargar el PDF.');
            return;
        }

        const doc = new window.jspdf.jsPDF();

        // Título del documento
        doc.setFontSize(18);
        doc.text(tipoPermiso, 10, 20);

        // Contenido del documento
        doc.setFontSize(12);
        doc.text(`Solicitante: ${nombre}`, 10, 40);
        doc.text(`RUT: ${rut}`, 10, 50);
        doc.text(`Período: ${fechaInicio} a ${fechaTermino}`, 10, 60);

        // Pie de página con firma
        doc.text('_____________________________', 10, 200);
        doc.text('Firma del Solicitante', 10, 210);

        // Guardar el PDF
        doc.save(`${tipoPermiso}_${nombre}.pdf`);
    });
});