const API_URL = 'https://back-end-fastapi-production.up.railway.app';

function getToken() {
    return localStorage.getItem('access_token');
}

document.getElementById('terminoContratoForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const token = getToken();
    if (!token) {
        alert('No se encontró token de autenticación. Por favor, inicia sesión.');
        window.location.href = '/login.html';
        return;
    }

    // Obtener datos del formulario
    const rutTrabajador = document.getElementById('rutTrabajador').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const fechaCarta = document.getElementById('fechaCarta').value;
    const fechaTermino = document.getElementById('fechaTermino').value;
    const articuloCausal = document.getElementById('articuloCausal').value.trim();
    const descripcionCausal = document.getElementById('descripcionCausal').value.trim();
    const fundamentacion = document.getElementById('fundamentacion').value.trim();
    const lugarPagoFiniquito = document.getElementById('lugarPagoFiniquito').value.trim();
    const telefonoNotaria = document.getElementById('telefonoNotaria').value.trim();

    // Validar que el RUT contenga solo números
    if (!/^\d+$/.test(rutTrabajador)) {
        alert('El RUT debe contener solo números, sin puntos ni guión.');
        return;
    }

    // Construir el objeto de datos
    const data = {
        rut_trabajador: rutTrabajador,
        ciudad: ciudad,
        fecha_carta: fechaCarta,
        fecha_termino: fechaTermino,
        articulo_causal: articuloCausal,
        descripcion_causal: descripcionCausal,
        fundamentacion: fundamentacion,
        lugar_pago_finiquito: lugarPagoFiniquito,
        telefono_notaria: telefonoNotaria
    };

    try {
        // Mostrar indicador de carga
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Generando PDF...';

        // Llamar al API
        const response = await fetch(`${API_URL}/contrato/generate-pdf-termino`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
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
        a.download = `termino_contrato_${rutTrabajador}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert('PDF generado y descargado exitosamente');

        // Limpiar formulario
        document.getElementById('terminoContratoForm').reset();

        // Restaurar botón
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;

    } catch (error) {
        console.error('Error:', error);
        alert('Error al generar el PDF: ' + error.message);

        // Restaurar botón
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="bi bi-download"></i> Generar y Descargar PDF';
    }
});
