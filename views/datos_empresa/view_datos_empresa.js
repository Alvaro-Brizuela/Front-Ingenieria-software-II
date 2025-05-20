/* PLANTILA HEADER - SIDE BAR */

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



/* FUNCIONES VIEW */

const regionesComunas = {
  "I de Tarapacá": ["Alto Hospicio", "Iquique", "Huara", "Camiña", "Colchane", "Pica", "Pozo Almonte"],
  "II de Antofagasta": ["Tocopilla", "María Elena", "Calama", "Ollagüe", "San Pedro de Atacama", "Antofagasta", "Mejillones", "Sierra Gorda", "Taltal"],
  "III de Atacama": ["Chañaral", "Diego de Almagro", "Copiapó", "Caldera", "Tierra Amarilla", "Vallenar", "Freirina", "Huasco", "Alto del Carmen"],
  "IV de Coquimbo": ["La Serena", "La Higuera", "Coquimbo", "Andacollo", "Vicuña", "Paihuano", "Ovalle", "Río Hurtado", "Monte Patria", "Combarbalá", "Punitaqui", "Illapel", "Salamanca", "Los Vilos", "Canela"],
  "IX de la Araucanía": ["Angol", "Renaico", "Collipulli", "Lonquimay", "Curacautín", "Ercilla", "Victoria", "Traiguén", "Lumaco", "Purén", "Los Sauces", "Temuco", "Lautaro", "Perquenco", "Vilcún", "Cholchol", "Cunco", "Melipeuco", "Curarrehue", "Pucón", "Villarrica", "Freire", "Pitrufquén", "Gorbea", "Loncoche", "Toltén", "Teodoro Schmidt", "Saavedra", "Carahue", "Nueva Imperial", "Galvarino", "Padre las Casas"],
  "Metropolitana de Santiago": ["Santiago", "Independencia", "Conchalí", "Huechuraba", "Recoleta", "Providencia", "Vitacura", "Lo Barnechea", "Las Condes", "Ñuñoa", "La Reina", "Macul", "Peñalolén", "La Florida", "San Joaquín", "La Granja", "La Pintana", "San Ramón", "San Miguel", "La Cisterna", "El Bosque", "Pedro Aguirre Cerda", "Lo Espejo", "Estación Central", "Cerrillos", "Maipú", "Quinta Normal", "Lo Prado", "Pudahuel", "Cerro Navia", "Renca", "Quilicura", "Colina", "Lampa", "Tiltil", "Puente Alto", "San José de Maipo", "Pirque", "San Bernardo", "Buin", "Paine", "Calera de Tango", "Melipilla", "María Pinto", "Curacaví", "Alhué", "San Pedro", "Talagante", "Peñaflor", "Isla de Maipo", "El Monte", "Padre Hurtado"],
  "V de Valparaíso": ["La Ligua", "Petorca", "Cabildo", "Zapallar", "Papudo", "Los Andes", "San Esteban", "Calle Larga", "Rinconada", "San Felipe", "Putaendo", "Santa María", "Panquehue", "Llaillay", "Catemu", "Quillota", "La Cruz", "Calera", "Nogales", "Hijuelas", "Limache", "Olmué", "Valparaíso", "Viña del Mar", "Quintero", "Puchuncaví", "Quilpué", "Villa Alemana", "Casablanca", "Concón", "Juan Fernández", "San Antonio", "Cartagena", "El Tabo", "El Quisco", "Algarrobo", "Santo Domingo", "Isla de Pascua"],
  "VI del Libertador General Bernardo O'Higgins": ["Rancagua", "Graneros", "Mostazal", "Codegua", "Machalí", "Olivar", "Requinoa", "Rengo", "Malloa", "Quinta de Tilcoco", "San Vicente", "Pichidegua", "Peumo", "Coltauco", "Coinco", "Doñihue", "Las Cabras", "San Fernando", "Chimbarongo", "Placilla", "Nancagua", "Chépica", "Santa Cruz", "Lolol", "Pumanque", "Palmilla", "Peralillo", "Pichilemu", "Navidad", "Litueche", "La Estrella", "Marchihue", "Paredones"],
  "VII del Maule": ["Curicó", "Teno", "Romeral", "Molina", "Sagrada Familia", "Hualañé", "Licantén", "Vichuquén", "Rauco", "Talca", "Pelarco", "Río Claro", "San Clemente", "Maule", "San Rafael", "Empedrado", "Pencahue", "Constitución", "Curepto", "Linares", "Yerbas Buenas", "Colbún", "Longaví", "Parral", "Retiro", "Villa Alegre", "San Javier", "Cauquenes", "Pelluhue", "Chanco"],
  "VIII del Biobío": ["Chillán", "San Carlos", "Ñiquén", "San Fabián", "Coihueco", "Pinto", "San Ignacio", "El Carmen", "Yungay", "Pemuco", "Bulnes", "Quillón", "Ránquil", "Portezuelo", "Coelemu", "Treguaco", "Cobquecura", "Quirihue", "Ninhue", "San Nicolás", "Chillán Viejo", "Alto Biobío", "Los Angeles", "Cabrero", "Tucapel", "Antuco", "Quilleco", "Santa Bárbara", "Quilaco", "Mulchén", "Negrete", "Nacimiento", "Laja", "San Rosendo", "Yumbel", "Concepción", "Talcahuano", "Penco", "Tomé", "Florida", "Hualpén", "Hualqui", "Santa Juana", "Lota", "Coronel", "San Pedro de la Paz", "Chiguayante", "Lebu", "Arauco", "Curanilahue", "Los Alamos", "Cañete", "Contulmo", "Tirua"],
  "X de los Lagos": ["Osorno", "San Pablo", "Puyehue", "Puerto Octay", "Purranque", "Río Negro", "San Juan de la Costa", "Puerto Montt", "Puerto Varas", "Cochamó", "Calbuco", "Maullín", "Los Muermos", "Fresia", "Llanquihue", "Frutillar", "Castro", "Ancud", "Quemchi", "Dalcahue", "Curaco de Vélez", "Quinchao", "Puqueldón", "Chonchi", "Queilén", "Quellón", "Chaitén", "Hualaihué", "Futaleufú", "Palena"],
  "XI Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Chile Chico", "Río Ibánez", "Cochrane", "O'Higgins", "Tortel"],
  "XII de Magallanes y Antártica Chilena": ["Natales", "Torres del Paine", "Punta Arenas", "Río Verde", "Laguna Blanca", "San Gregorio", "Porvenir", "Primavera", "Timaukel", "Cabo de Hornos", "Antártica"],
  "XIV de los Ríos": ["Valdivia", "Mariquina", "Lanco", "Máfil", "Corral", "Los Lagos", "Panguipulli", "Paillaco", "La Unión", "Futrono", "Río Bueno", "Lago Ranco"],
  "XV de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
};


/* ACÁ ESTAN LOS DATOS DE LA EMPRESA OBTENIDOS DESDE EL FORMULARIO */
const form = document.getElementById('form-datos-empresa');

form.addEventListener('submit', function (e) {
  e.preventDefault(); 

  const formData = new FormData(form);

  // Imprimir los datos en la consola
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

});


function poblarSelectRegiones(selectId) {
  const select = document.getElementById(selectId);
  select.innerHTML = '<option selected disabled>Seleccione</option>';

  Object.keys(regionesComunas).forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    select.appendChild(option);
  });
}


function actualizarComunasPorRegion(inputRegionId, datalistComunaId) {
  const regionSelect = document.getElementById(inputRegionId);
  const comunaDatalist = document.getElementById(datalistComunaId);

  regionSelect.addEventListener('change', function () {
    const regionSeleccionada = this.value;
    const comunas = regionesComunas[regionSeleccionada] || [];

    // Limpiar opciones anteriores
    comunaDatalist.innerHTML = '';

    // Agregar nuevas opciones
    comunas.forEach(comuna => {
      const option = document.createElement('option');
      option.value = comuna;
      comunaDatalist.appendChild(option);
    });
  });
}

/* Para que se actualicen los datos */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener referencias a los select
  const regionSelect = document.getElementById('region');
  const comunaSelect = document.getElementById('comuna');

  // 2. Poblar regiones (antes de activar Choices)
  poblarSelectRegiones('region');

  // 3. Activar Choices en región
  const regionChoices = new Choices(regionSelect, {
    shouldSort: false,
    searchEnabled: true,
    itemSelectText: '',
    placeholder: true
  });

  // 4. Activar Choices en comuna (vacío por ahora)
  const comunaChoices = new Choices(comunaSelect, {
    shouldSort: false,
    searchEnabled: true,
    itemSelectText: '',
    placeholder: true
  });

  // 5. Escuchar cambios en región para actualizar comunas
  regionSelect.addEventListener('change', function () {
    const regionSeleccionada = regionSelect.value;
    const comunas = regionesComunas[regionSeleccionada] || [];

    // Limpiar comuna anterior
    comunaChoices.clearStore();

    // Agregar nuevas comunas
    const opciones = comunas.map(comuna => ({
      value: comuna,
      label: comuna
    }));

    comunaChoices.setChoices(opciones, 'value', 'label', true);
  });
});


