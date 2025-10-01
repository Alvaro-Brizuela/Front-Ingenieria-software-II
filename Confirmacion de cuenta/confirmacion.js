function customAlert(message) {
    // Crear el fondo para la alerta
    const alertBackground = document.createElement('div');
    alertBackground.style.position = 'fixed';
    alertBackground.style.top = '0';
    alertBackground.style.left = '0';
    alertBackground.style.width = '100%';
    alertBackground.style.height = '100%';
    alertBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    alertBackground.style.display = 'flex';
    alertBackground.style.justifyContent = 'center';
    alertBackground.style.alignItems = 'center';
    alertBackground.style.zIndex = '9999';

    // Crear el cuadro de alerta
    const alertBox = document.createElement('div');
    alertBox.style.backgroundColor = '#364855';
    alertBox.style.border = '1px solid white';
    alertBox.style.borderRadius = '8px';
    alertBox.style.padding = '20px';
    alertBox.style.color = 'white';
    alertBox.style.fontFamily = 'Arial, sans-serif';
    alertBox.style.fontSize = '18px';
    alertBox.style.textAlign = 'center';
    alertBox.style.minWidth = '320px';
    alertBox.style.maxWidth = '400px';
    alertBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    alertBox.style.animation = 'fadeIn 0.3s ease';

    // Añadir el mensaje
    const alertMessage = document.createElement('p');
    alertMessage.style.margin = '0';
    alertMessage.style.marginBottom = '15px';
    alertMessage.innerText = message;

    // Botón para cerrar la alerta
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#2aa398';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '16px';
    closeButton.style.transition = 'background-color 0.3s ease';

    // Efecto hover en el botón
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = '#218379';
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = '#2AA398';
    });

    // Acción al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', () => {
        document.body.removeChild(alertBackground);
    });

    // Ensamblar la alerta
    alertBox.appendChild(alertMessage);
    alertBox.appendChild(closeButton);
    alertBackground.appendChild(alertBox);

    // Agregar el fondo al cuerpo del documento
    document.body.appendChild(alertBackground);
}
document.getElementById("backButton").addEventListener("click", function() {
    alert("Redirigiendo...");
});

async function enviarDatos() {
    const url = new URLSearchParams(window.location.search);
    const token = url.get("token");
    
    // Define la consulta como una cadena directamente
    const queryValidarCorreo = {
        query: `
            mutation {
            validarCorreo(token: "${token}") {
                id
                nombre
                correo_paciente
                confirmacionCorreo
          }
        }
    `,
    };
    try {
        const respuesta = await fetch('http://localhost:8090/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(queryValidarCorreo), // Convertimos a JSON
        });
    
        // Verifica errores de la red
        if (!respuesta.ok) {
            throw new Error(`Error de red: ${respuesta.statusText}`);
        }
    
        // Procesa la respuesta JSON
        const result = await respuesta.json();
    
        // Verifica si hay errores enviados por GraphQL
        if (result.errors) {
            // Muestra el primer error enviado por el backend
            const errorMessage = result.errors[0].message;
            customAlert(errorMessage); // Mostrar mensaje al usuario
            return;
        }
    
        // Si no hay errores, maneja la respuesta
    } catch (error) {
        customAlert("Hubo un error inesperado. Por favor, intenta nuevamente.");
    }
    
}



document.addEventListener("DOMContentLoaded", function() {
    enviarDatos();
});