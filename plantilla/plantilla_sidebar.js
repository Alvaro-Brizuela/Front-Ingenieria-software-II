/* PLANTILLA HEADER - SIDE BAR (CORREGIDO) */

document.addEventListener('DOMContentLoaded', function() {
    // ACÁ: Manejo de la apertura/cierre del sidebar y menú de usuario
    const toggleBtn = document.getElementById("toggleSidebar");
    const closeBtn = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const body = document.body; // <-- CONSTANTE AÑADIDA

    const profileIcon = document.getElementById('profileIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const userNameDisplay = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');

    /**
     * ACÁ: Muestra la inicial y el nombre del usuario en el header.
     * @param {string} name - Nombre del usuario.
     */
    function setUserInitial(name) {
        const initial = name.trim().charAt(0).toUpperCase();
        profileIcon.textContent = initial;
        userNameDisplay.textContent = name;
    }

    // ACÁ: Inicializa el nombre del usuario (debe ser reemplazado por el real)
    setUserInitial("Nombre de Prueba");

    // ACÁ: Abre/cierra el menú de usuario al hacer click en el icono de perfil
    profileIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    // ACÁ: Oculta el menú de usuario si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (
            !profileIcon.contains(event.target) &&
            !dropdownMenu.contains(event.target)
        ) {
            dropdownMenu.classList.remove('show');
        }
    });

    // ACÁ: Acción de cerrar sesión (debe ser reemplazada por la lógica real)
    logoutBtn.addEventListener('click', () => {
        alert("Sesión cerrada");
    });

    // ACÁ: Abre el sidebar al hacer click en el botón hamburguesa
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
        body.classList.add("sidebar-open"); // <-- LÍNEA AÑADIDA
        toggleBtn.classList.add("hide");
    });

    // ACÁ: Cierra el sidebar al hacer click en el botón de cerrar
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("show");
        body.classList.remove("sidebar-open"); // <-- LÍNEA AÑADIDA
        toggleBtn.classList.remove("hide");
    });

    // ACÁ: Cierra el sidebar si se hace click fuera de él
    document.addEventListener('click', function (event) {
        if (
            sidebar.classList.contains('show') &&
            !sidebar.contains(event.target) &&
            !toggleBtn.contains(event.target)
        ) {
            sidebar.classList.remove('show');
            body.classList.remove("sidebar-open"); // <-- LÍNEA AÑADIDA
            toggleBtn.classList.remove('hide');
        }
    });
});