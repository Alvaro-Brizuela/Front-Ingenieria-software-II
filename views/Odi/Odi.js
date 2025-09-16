document.addEventListener('DOMContentLoaded', () => {

    const nombreInput = document.getElementById('nombre');
    const apellidoPaternoInput = document.getElementById('apellidoPaterno');
    const apellidoMaternoInput = document.getElementById('apellidoMaterno');

    // Función para validar que solo se puedan ingresar letras
    function validarSoloLetras(event) {
        // Expresión regular para verificar si el carácter es un número
        const esNumero = /[0-9]/.test(event.key);
        if (esNumero) {
            event.preventDefault(); // Detiene el evento y no permite escribir el número
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

// *** LÓGICA CRÍTICA PARA CUANDO SE CIERRA TOCANDO AFUERA ***
// Escuchamos el evento de "transición terminada" en la barra lateral.
// La barra lateral tiene una transición en su propiedad 'left'. Cuando esa transición termina, este evento se dispara.
if (sidebar) {
    sidebar.addEventListener('transitionend', () => {
        // Si la barra lateral ya no tiene la clase 'show' (lo que significa que se cerró)
        if (!sidebar.classList.contains('show')) {
            // Quitamos la clase del body para que el texto vuelva a su posición original
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

    agregarFilaBtn.addEventListener('click', () => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td><textarea class="form-control" rows="3"></textarea></td>
            <td><textarea class="form-control" rows="3"></textarea></td>
            <td><textarea class="form-control" rows="3"></textarea></td>
            <td><textarea class="form-control" rows="3"></textarea></td>
            <td class="text-center">
                <button class="btn btn-danger btn-sm eliminar-fila">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        odiTableBody.appendChild(nuevaFila);
    });

    // Escuchar los clics en la tabla para manejar el botón de eliminar
    odiTableBody.addEventListener('click', (event) => {
        // Verificar si el clic fue en un botón con la clase 'eliminar-fila'
        if (event.target.classList.contains('eliminar-fila') || event.target.closest('.eliminar-fila')) {
            const fila = event.target.closest('tr');
            fila.remove(); // Elimina la fila completa
        }
    });

    // Lógica para descargar un PDF de la tabla
    descargarPdfBtn.addEventListener('click', () => {
        // ... (El código para generar el PDF sigue siendo el mismo) ...
        const doc = new window.jspdf.jsPDF();
        doc.autoTable({
            html: '#odiTableBody',
            headStyles: { fillColor: [52, 73, 94] },
            didDrawPage: function (data) {
                doc.text("Obligación de Informar (ODI) - Actividad a Realizar", 14, 15);
            },
            body: odiTableBody,
        });
        doc.save('ODI_documento.pdf');
    });

});