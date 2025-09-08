/* PLANTILLA HEADER - SIDE BAR */

// ACÁ: Manejo de la apertura/cierre del sidebar y menú de usuario
const toggleBtn = document.getElementById("toggleSidebar");
const closeBtn = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const body = document.body;

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
    toggleBtn.classList.add("hide");
});

// ACÁ: Cierra el sidebar al hacer click en el botón de cerrar
closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
    toggleBtn.classList.remove("hide"); 
});

// ACÁ: Cierra el sidebar si se hace click fuera de él
document.addEventListener('click', function (event) {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebar');

  if (
    sidebar.classList.contains('show') &&
    !sidebar.contains(event.target) &&
    !toggleBtn.contains(event.target)
  ) {
    sidebar.classList.remove('show');
    toggleBtn.classList.remove('hide');
  }
});

/***************** FUNCIONES VIEW *********************************/

/**
 * ACÁ: Valida si un RUT chileno es válido.
 * @param {string} rut - RUT a validar.
 * @returns {boolean} true si es válido, false si no.
 */
function formatearRut(rut) {
  rut = rut.replace(/[^\dkK]/g, '').toUpperCase();
  if (rut.length <= 1) return rut;
  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${cuerpo}-${dv}`;
}

/**********************************************
 ************** DOMContentLoaded **************
 **********************************************/

// ACÁ: Valida el RUT cuando el usuario termina de escribirlo
function validarRut(rut) {
  rut = rut.replace(/[^\dkK]/g, '').toUpperCase();
  if (rut.length < 2) return false;
  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvEsperado = 11 - (suma % 11);
  dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvEsperado;
}

const rutInput = document.getElementById('rutTrabajador');
if (rutInput) {
  rutInput.addEventListener('input', function () {
    let valor = rutInput.value.replace(/[^\dkK]/g, '').toUpperCase();
    if (valor.length > 1) {
      rutInput.value = formatearRut(valor);
    } else {
      rutInput.value = valor;
    }
  });

  rutInput.addEventListener('blur', function () {
    if (!validarRut(rutInput.value)) {
      rutInput.classList.add('is-invalid');
      rutInput.setCustomValidity('RUT inválido');
    } else {
      rutInput.classList.remove('is-invalid');
      rutInput.setCustomValidity('');
    }
  });
}


// ACÁ: Valida que el teléfono personal tenga al menos 8 dígitos
const telefonoPersonalInput = document.getElementById('telefonoPersonal');
if (telefonoPersonalInput) {
  telefonoPersonalInput.addEventListener('input', function () {
    if (telefonoPersonalInput.value.length < 8) {
      telefonoPersonalInput.classList.add('is-invalid');
      telefonoPersonalInput.setCustomValidity('Debe tener al menos 8 dígitos');
    } else {
      telefonoPersonalInput.classList.remove('is-invalid');
      telefonoPersonalInput.setCustomValidity('');
    }
  });
}

// ACÁ: Muestra el campo "Plan en UF" solo si la institución de salud no es FONASA
const planUfContainer = document.getElementById('planUfContainer');
const selectSalud = document.getElementById('salud');
const planUFInput = document.getElementById('planUF');

if (selectSalud && planUfContainer && planUFInput) {
  selectSalud.addEventListener('change', function () {
    if (selectSalud.value.trim().toLowerCase() !== 'fonasa') {
      planUfContainer.style.display = 'block';
      planUFInput.removeAttribute('disabled');
      planUFInput.setAttribute('required', 'required');
    } else {
      planUfContainer.style.display = 'none';
      planUFInput.removeAttribute('required');
      planUFInput.setAttribute('disabled', 'disabled');
      planUFInput.value = '';
    }
  });
}
// ACÁ: Muestra la vista previa de la foto del trabajador cuando se selecciona un archivo
    document.getElementById('fotoTrabajador').addEventListener('change', function(event) {
      const [file] = event.target.files;
      if (file) {
        const preview = document.getElementById('previewFoto');
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
        const fotoArribaDerecha = document.getElementById('fotoArribaDerecha');
        fotoArribaDerecha.src = URL.createObjectURL(file);
        fotoArribaDerecha.style.display = 'block';
      }
    });
    // ACÁ: Muestra la vista previa de la foto carnet frontal cuando se selecciona un archivo
    document.getElementById('fotoCarnetFrontal').addEventListener('change', function(event) {
      const [file] = event.target.files;
      if (file) {
        const preview = document.getElementById('previewCarnetFrontal');
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
      }
    });
    // ACÁ: Muestra la vista previa de la foto carnet reverso cuando se selecciona un archivo
    document.getElementById('fotoCarnetReverso').addEventListener('change', function(event) {
      const [file] = event.target.files;
      if (file) {
        const preview = document.getElementById('previewCarnetReverso');
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
      }
    }); 

    // PLANTILLA: Inicialización de Choices.js en los selects indicados
    document.addEventListener('DOMContentLoaded', function() {
      // Aquí puedes adaptar la carga de opciones desde tu backend FastAPI/PostgreSQL
      // Ejemplo:
      // fetch('/api/tu-endpoint')
      //   .then(res => res.json())
      //   .then(data => {
      //     // Llena el select con las opciones recibidas
      //   });

      // Inicializa Choices.js en los selects
      const selects = [
        'nacionalidadTrabajador',
        'estadoCivil',
        'region',
        'comuna',
        'afp',
        'salud',
        'cargo',
        'formaPago',
        'sexo',
        'jefe'
      ];
      selects.forEach(function(id) {
        const el = document.getElementById(id);
        if (el) {
          new Choices(el, {
            searchEnabled: true,
            itemSelectText: '',
            shouldSort: false
          });
        }
      });
      // ACÁ: Inicializa flatpickr en los campos de fecha
      const fechaNacimiento = document.getElementById('fechaNacimientoTrabajador');
      if (fechaNacimiento) {
        flatpickr(fechaNacimiento, {
          dateFormat: "Y-m-d",
          minDate: new Date().getFullYear() - 100 + "-01-01",
          maxDate: new Date().getFullYear() - 15 + "-12-31"
        });
      }
      const fechaIngreso = document.getElementById('fechaIngreso');
      if (fechaIngreso) {
        flatpickr(fechaIngreso, {
          dateFormat: "Y-m-d",
          maxDate: "today"
        });
      }
      const fechaContrato = document.getElementById('fechaContrato');
      if (fechaContrato) {
        flatpickr(fechaContrato, {
          dateFormat: "Y-m-d",
          maxDate: "today"
        });
      }
    });

      // ACÁ: Muestra u oculta los formularios según la acción seleccionada (nuevo/buscar trabajador)
  document.addEventListener('DOMContentLoaded', function() {
    const btnNuevo = document.getElementById('btnNuevoTrabajador');
    const btnBuscar = document.getElementById('btnBuscarTrabajador');
    const busquedaDiv = document.getElementById('busquedaTrabajador');
    const formDatos = document.getElementById('form-datos-empresa');
    btnNuevo.addEventListener('click', function() {
      busquedaDiv.style.display = 'none';
      formDatos.style.display = '';
    });
    btnBuscar.addEventListener('click', function() {
      busquedaDiv.style.display = '';
      formDatos.style.display = 'none';
    });
  })

//Enviar datos del trabajador (POST/api/trabajador) 
async function enviarTrabajador() {
  const trabajador = {
    datos_generales: {
      nombres: document.getElementById('nombresTrabajador').value,
      apellidoPaterno: document.getElementById('apellidoPaterno'),
      apellidoMaterno: document.getElementById('apellidoMaterno'),
      rut: document.getElementById('rutTrabajador').value,
      fecha_nacimiento: document.getElementById('fechaNacimientoTrabajador').value,
      sexo: document.getElementById('sexo').value,
      nacionalidad: document.getElementById('nacionalidadTrabajador').value,
      estado_civil: document.getElementById('estadoCivil').value,
      foto_url: document.getElementById('fotoArribaDerecha').src
    },
    info_contacto: {
      telefono_personal: document.getElementById('telefonoPersonal').value,
      telefono_corporativo: document.getElementById('telefonoCorporativo')?.value || null,
      correo_personal: document.getElementById('correoPersonal').value,
      correo_corporativo: document.getElementById('correoCorporativo')?.value || null
    },
    info_vivienda: {
      direccion: document.getElementById('direccion').value,
      region: document.getElementById('region').value,
      comuna: document.getElementById('comuna').value,
      provincia: document.getElementById('provincia').value
    },
    info_seguros: {
      afp: document.getElementById('afp').value,
      instituto_salud: document.getElementById('salud').value,
      plan_uf: parseFloat(document.getElementById('planUF').value)
    },
    info_laboral: {
      cargo: document.getElementById('cargo').value,
      jefe_directo: document.getElementById('jefe').value,
      sueldo_base: parseFloat(document.getElementById('sueldoBase').value),
      fecha_ingreso: document.getElementById('fechaIngreso').value,
      fecha_contrato: document.getElementById('fechaContrato').value,
      forma_pago: document.getElementById('formaPago').value
    }
  };

  //ACÁ: esta la conexion con la base de datos
  const res = await fetch('/api/trabajador', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trabajador)
  });
  const data = await res.json();
  alert('Trabajador guardado: ' + JSON.stringify(data, null, 2));
}
  
async function cargarTrabajador(id) {
  const res = await fetch(`/api/trabajador/${id}`);
  const data = await res.json();

  // Rellenar los campos del formulario
  document.getElementById('nombresTrabajador').value = data.datos_generales.nombre;
  document.getElementById('apellidoPaterno').value = data.datos_generales.apellidoPaterno;
  document.getElementById('apellidoMaterno').value = data.datos_generales.apellidoMaterno;
  document.getElementById('rutTrabajador').value = data.datos_generales.rut;
  document.getElementById('fechaNacimientoTrabajador').value = data.datos_generales.fecha_nacimiento;
  document.getElementById('sexo').value = data.datos_generales.sexo;
  document.getElementById('nacionalidadTrabajador').value = data.datos_generales.nacionalidad;
  document.getElementById('estadoCivil').value = data.datos_generales.estado_civil;
  document.getElementById('fotoArribaDerecha').src = data.datos_generales.foto_url;

  document.getElementById('telefonoPersonal').value = data.info_contacto.telefono_personal;
  if (document.getElementById('telefonoCorporativo')) document.getElementById('telefonoCorporativo').value = data.info_contacto.telefono_corporativo || '';
  document.getElementById('correoPersonal').value = data.info_contacto.correo_personal;
  if (document.getElementById('correoCorporativo')) document.getElementById('correoCorporativo').value = data.info_contacto.correo_corporativo || '';

  document.getElementById('direccion').value = data.info_vivienda.direccion;
  document.getElementById('region').value = data.info_vivienda.region;
  document.getElementById('comuna').value = data.info_vivienda.comuna;
  document.getElementById('provincia').value = data.info_vivienda.provincia;

  document.getElementById('afp').value = data.info_seguros.afp;
  document.getElementById('salud').value = data.info_seguros.instituto_salud;
  document.getElementById('planUF').value = data.info_seguros.plan_uf;

  document.getElementById('cargo').value = data.info_laboral.cargo;
  document.getElementById('jefe').value = data.info_laboral.jefe_directo;
  document.getElementById('sueldoBase').value = data.info_laboral.sueldo_base;
  document.getElementById('fechaIngreso').value = data.info_laboral.fecha_ingreso;
  document.getElementById('fechaContrato').value = data.info_laboral.fecha_contrato;
  document.getElementById('formaPago').value = data.info_laboral.forma_pago;
}

  // ...plantilla para gestión de contratos...

  // ...plantilla para eliminación de contratos...

  // ...plantilla para gestión de documentos personales/laborales...


// ACÁ: estan los elementos para descargar, eliminar y cambiar la imagen del trabajador
document.addEventListener('DOMContentLoaded', function () {
  const foto = document.getElementById('fotoArribaDerecha');
  const modalDescarga = document.getElementById('modalDescargaImagen');
  const modalEliminar = document.getElementById('modalEliminarFoto');
  const fondo = document.getElementById('fondoModalDescarga');

  const btnDescargar = document.getElementById('btnDescargarFoto');
  const btnEliminar = document.getElementById('btnEliminarFoto');
  const btnConfirmarDescarga = document.getElementById('confirmarDescargaBtn');
  const btnCancelarDescarga = document.getElementById('cancelarDescargaBtn');
  const btnConfirmarEliminar = document.getElementById('confirmarEliminarBtn');
  const btnCancelarEliminar = document.getElementById('cancelarEliminarBtn');
  const btnAgregarFoto = document.getElementById('btnAgregarFoto');
  const inputAgregarFoto = document.getElementById('inputAgregarFoto');
  const fotoArribaDerecha = document.getElementById('fotoArribaDerecha');

  const inputFoto = document.getElementById('fotoTrabajador');
  const previewFoto = document.getElementById('previewFoto');

  // ----- Modal de DESCARGA -----
  if (btnDescargar) {
    btnDescargar.addEventListener('click', () => {
      modalDescarga.style.display = 'block';
      fondo.style.display = 'block';
    });

    btnCancelarDescarga.addEventListener('click', () => {
      modalDescarga.style.display = 'none';
      fondo.style.display = 'none';
    });

    btnConfirmarDescarga.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = foto.src;
      link.download = 'foto_trabajador.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      modalDescarga.style.display = 'none';
      fondo.style.display = 'none';
    });
  }

  // ----- Modal de ELIMINACIÓN -----
  if (btnEliminar) {
    btnEliminar.addEventListener('click', () => {
      modalEliminar.style.display = 'block';
      fondo.style.display = 'block';
    });

    btnCancelarEliminar.addEventListener('click', () => {
      modalEliminar.style.display = 'none';
      fondo.style.display = 'none';
    });

    btnConfirmarEliminar.addEventListener('click', () => {
      foto.src = 'img/inicio.png'; // Imagen por defecto nueva
      if (inputFoto) inputFoto.value = '';
      if (previewFoto) previewFoto.style.display = 'none';

      modalEliminar.style.display = 'none';
      fondo.style.display = 'none';
    });
  }

  // ----- AGREGAR FOTO -----
  if (btnAgregarFoto && inputAgregarFoto && fotoArribaDerecha) {
    btnAgregarFoto.addEventListener('click', () => {
      inputAgregarFoto.click();
    });

    inputAgregarFoto.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const nuevaSrc = URL.createObjectURL(file);
        fotoArribaDerecha.src = nuevaSrc;
      }
    });
  }

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////

// Función de ejemplo para mostrar en consola el objeto que se enviaría al backend
function mostrarTrabajadorEnConsola() {
  const trabajador = {
    datos_generales: {
      nombre: document.getElementById('nombresTrabajador').value,
      apellidoPaterno: document.getElementById('apellidoPaterno').value,
      apellidoMaterno: document.getElementById('apellidoMaterno').value,
      rut: document.getElementById('rutTrabajador').value,
      fecha_nacimiento: document.getElementById('fechaNacimientoTrabajador').value,
      sexo: document.getElementById('sexo').value,
      nacionalidad: document.getElementById('nacionalidadTrabajador').value,
      estado_civil: document.getElementById('estadoCivil').value,
      foto_url: document.getElementById('fotoArribaDerecha').src
    },
    info_contacto: {
      telefono_personal: document.getElementById('telefonoPersonal').value,
      telefono_corporativo: document.getElementById('telefonoCorporativo')?.value || null,
      correo_personal: document.getElementById('correoPersonal').value,
      correo_corporativo: document.getElementById('correoCorporativo')?.value || null
    },
    info_vivienda: {
      direccion: document.getElementById('direccion').value,
      region: document.getElementById('region').value,
      comuna: document.getElementById('comuna').value,
      provincia: document.getElementById('provincia').value
    },
    info_seguros: {
      afp: document.getElementById('afp').value,
      instituto_salud: document.getElementById('salud').value,
      plan_uf: parseFloat(document.getElementById('planUF').value)
    },
    info_laboral: {
      cargo: document.getElementById('cargo').value,
      jefe_directo: document.getElementById('jefe').value,
      sueldo_base: parseFloat(document.getElementById('sueldoBase').value),
      fecha_ingreso: document.getElementById('fechaIngreso').value,
      fecha_contrato: document.getElementById('fechaContrato').value,
      forma_pago: document.getElementById('formaPago').value
    }
  };
  console.log('Objeto enviado al backend:', trabajador);
}