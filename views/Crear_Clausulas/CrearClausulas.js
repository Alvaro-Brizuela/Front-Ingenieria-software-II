/* =================================================================
   FUNCIONALIDAD ESPECÍFICA PARA CREAR CLÁUSULAS
   ================================================================= */
document.addEventListener('DOMContentLoaded', () => {

    const clausulaForm = document.getElementById('clausulaForm');

    if (clausulaForm) {
        clausulaForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que la página se recargue al enviar el formulario

            // 1. Obtener los datos del formulario
            const tituloClausula = document.getElementById('tituloClausula').value;
            const contenidoClausula = document.getElementById('contenidoClausula').value;

            // 2. Validar que los campos no estén vacíos
            if (!tituloClausula.trim() || !contenidoClausula.trim()) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            // 3. Crear el objeto con los datos de la cláusula
            const datosClausula = {
                titulo: tituloClausula,
                contenido: contenidoClausula
            };

            // 4. Mostrar los datos por consola para verificar (simulación de envío)
            console.log("Datos de la cláusula a enviar:", datosClausula);

            // 5. Simulación de la llamada a la API
            // Aquí iría tu código para enviar 'datosClausula' a un backend
            /*
            fetch('/api/v1/clausulas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosClausula),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un problema al guardar la cláusula.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                alert('¡Cláusula guardada exitosamente!');
                clausulaForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error al guardar la cláusula. Inténtelo de nuevo.');
            });
            */
            
            // Simulación de éxito
            alert('¡Cláusula guardada exitosamente! (Simulación)');
            clausulaForm.reset();
        });
    } else {
        console.error("Error: No se encontró el formulario con el ID 'clausulaForm'.");
    }

});