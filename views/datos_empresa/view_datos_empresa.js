/* PLANTILA HEADER - SIDE BAR */

/* ----- FUNCIONALIDAD DEL SIDEBAR Y HEADER ----- */
    const toggleBtn = document.getElementById("toggleSidebar");
    const closeBtn = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    const profileIcon = document.getElementById('profileIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const userNameDisplay = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');

    // Muestra la inicial y el nombre del usuario en el header.
    function setUserInitial(name) {
        const initial = name.trim().charAt(0).toUpperCase();
        profileIcon.textContent = initial;
        userNameDisplay.textContent = name;
    }

    // Inicializa el nombre del usuario (puedes cambiarlo por el real)
    setUserInitial("Nombre de Prueba");

    // Abre/cierra el menú de usuario al hacer click en el icono de perfil
    profileIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    // Oculta el menú de usuario si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (
            !profileIcon.contains(event.target) &&
            !dropdownMenu.contains(event.target)
        ) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Acción de cerrar sesión (reemplazar por la lógica real)
    logoutBtn.addEventListener('click', () => {
        localStorage.clear(); // borra tokens y datos
        window.location.href = "../Login/view_login.html"; 
    });

    // Abre el sidebar y desplaza el cuerpo de la página
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
        body.classList.add("sidebar-open");
        toggleBtn.classList.add("hide");
    });

    // Cierra el sidebar y devuelve el cuerpo de la página a su lugar
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("show");
        body.classList.remove("sidebar-open");
        toggleBtn.classList.remove("hide"); 
    });

    // Cierra el sidebar si se hace clic fuera de él
    document.addEventListener('click', function (event) {
      if (
        sidebar.classList.contains('show') &&
        !sidebar.contains(event.target) &&
        !toggleBtn.contains(event.target)
      ) {
        sidebar.classList.remove("show");
        body.classList.remove("sidebar-open");
        toggleBtn.classList.remove("hide");
      }
    });

/* ----- FIN DEL CÓDIGO DEL SIDEBAR ----- */

// Mostrar inicial y nombre
function setUserInitial(name) {
    const initial = name.trim().charAt(0).toUpperCase();
    profileIcon.textContent = initial;
    userNameDisplay.textContent = name;
}

// ACA VA EL NOMBRE DEL USUARIO
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
   
    // ACA VA LA ACCION DE CERRAR SESIÓN
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

// CERRAR AL HACER CLICK AFUERA 
document.addEventListener('click', function (event) {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebar');

  // Si el sidebar está abierto y el clic NO fue dentro del sidebar ni en el botón
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


/* ACA ESTAN LOS DATOS DE LA EMPRESA OBTENIDOS DESDE EL FORMULARIO */
const form = document.getElementById('form-datos-empresa');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // evitar recarga

  const tipoSociedad = document.getElementById('tipoSociedad').value;
  const cantidadAcciones = parseInt(document.getElementById('cantidadAcciones').value) || 0;
  const capitalTotal = parseInt(document.getElementById('capitalTotal').value) || 0;

  const sociedadesSinAcciones = ['Limitada', 'EIRL', 'Individual'];

  // VALIDACIÓN 1
  if (sociedadesSinAcciones.includes(tipoSociedad) && cantidadAcciones > 0) {
    alert(`La sociedad de tipo "${tipoSociedad}" no permite vender acciones, solo participación en porcentaje.`);
    document.getElementById('cantidadAcciones').focus();
    return;
  }

  // VALIDACIÓN 2
  if (cantidadAcciones < 1) {
    alert("La cantidad de acciones totales debe ser al menos 1.");
    document.getElementById('cantidadAcciones').focus();
    return;
  }

  if (capitalTotal < 1) {
    alert("El capital total debe ser al menos $1.");
    document.getElementById('capitalTotal').focus();
    return;
  }

  // Crear FormData
  const formData = new FormData(form);

  // ACA: agregar archivos históricos seleccionados a formData
  archivosCargados.forEach((archivo, index) => {
    formData.append('archivosHistoricos[]', archivo);
  });

  // ACA: enviar al backend
  fetch('/api/empresa/guardar', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    // ACA: manejar respuesta del backend
    console.log('✅ Envío exitoso:', data);
    // puedes redirigir, mostrar mensaje, etc.
  })
  .catch(err => {
    console.error('❌ Error al enviar datos:', err);
    alert('Hubo un error al guardar la empresa.');
  });


  // ACA: Muestra de prueba en consola -> BORRAR 
  console.log('===== DATOS A ENVIAR AL BACKEND =====');

  // Mostrar campos simples del formulario
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`🗂️ ARCHIVO → ${key}: ${value.name} (${value.size} bytes)`);
    } else {
      console.log(`📄 ${key}: ${value}`);
    }
  }

  console.log('======================================');

});


// ACA: funcion para mostrar los datos
// === FUNCION PARA MOSTRAR LOS DATOS DE LA EMPRESA ===
function cargarDatosEmpresa(data) {
  // === CAMPOS BÁSICOS ===
  document.getElementById('razonSocial').value = data.razon_social || '';
  document.getElementById('nombreFantasia').value = data.nombre_fantasia || '';
  document.getElementById('rutEmpresa').value = (data.rut_empresa && data.DV_rut) 
      ? `${data.rut_empresa}-${data.DV_rut}` 
      : '';
  document.getElementById('capitalTotal').value = data.acciones_capital?.capital_total || '';
  document.getElementById('cantidadAcciones').value = data.acciones_capital?.cantidad_acciones || '';
  document.getElementById('fechaConstitucion').value = data.fecha_constitucion || '';
  document.getElementById('fechaInicio').value = data.fecha_inicio_actividades || '';
  document.getElementById('correo').value = data.correo || '';
  document.getElementById('telefono').value = data.telefono || '';
  document.getElementById('direccion').value = data.direccion_fisica || '';

  // === DATOS LEGALES ===
  if (data.datos_legales) {
    document.getElementById('tipoSociedad').value = data.datos_legales.tipo_sociedad || '';
    const rep = data.datos_legales.representante || {};
    document.getElementById('nombresRepresentante').value = rep.nombre || '';
    document.getElementById('apellidoPaternoRepresentante').value = rep.apellido_paterno || '';
    document.getElementById('apellidoMaternoRepresentante').value = rep.apellido_materno || '';
    document.getElementById('rutRepresentante').value = rep.rut || '';
    document.getElementById('generoRepresentante').value = rep.genero || '';
  }

  // === DIRECCIÓN ===
  if (data.direccion) {
    document.getElementById('region').value = data.direccion.region || '';
    document.getElementById('comuna').value = data.direccion.comuna || '';
    document.getElementById('provincia').value = data.direccion.provincia || '';
    document.getElementById('direccion').value = data.direccion.direccion || '';
  }

  // === SOCIOS ===
  if (Array.isArray(data.empresa_socio)) {
    data.empresa_socio.forEach(socio => agregarSocioDesdeDatos(socio));
  }

  // === USUARIOS AUTORIZADOS (máx 3 en HTML) ===
  if (Array.isArray(data.usuario)) {
  data.usuario.forEach(u => {
    // Si el usuario tiene múltiples login_usuario
    if (Array.isArray(u.login_usuario)) {
      u.login_usuario.forEach(login => {
        agregarUsuarioDesdeDatos({
          nombre: u.nombre || '',
          rut: u.rut || '',
          cargo: u.cargo || '',
          correo: login.correo || '',
          telefono: login.telefono || ''
        });
      });
    }
  });
  }


  // === ARCHIVOS HISTÓRICOS ===
  if (Array.isArray(data.archivos_historicos)) {
    archivosCargados.length = 0;
    data.archivos_historicos.forEach(nombre => {
      archivosCargados.push({ name: nombre, size: 0, desdeServidor: true });
    });
    renderizarListaArchivos();
  }

  // === VALIDACIONES Y CÁLCULOS ===
  actualizarCapitalSocios();
  validarSumaAccionesSocios();
  validarSumaParticipacion();
}




// ACA estan las funciones para formatear y validar los ruts
/**
 * Formatea el RUT chileno agregando puntos y guion.
 * @param {string} rut
 * @returns {string}
 */
function formatearRut(rut) {
  rut = rut.replace(/[^\dkK]/g, '').toUpperCase();
  if (rut.length <= 1) return rut;
  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${cuerpo}-${dv}`;
}

/**
 * Valida si un RUT chileno es válido.
 * @param {string} rut
 * @returns {boolean}
 */
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

/**
 * Aplica formateo y validación visual al input de RUT.
 * @param {HTMLInputElement} input
 */
function aplicarFormatoYValidacionRut(input) {
  let valor = input.value.replace(/[^\dkK]/g, '').toUpperCase();
  input.value = valor.length > 1 ? formatearRut(valor) : valor;

  if (valor.length > 1 && !validarRut(valor)) {
    input.classList.add('is-invalid');
    input.setCustomValidity('RUT inválido');
  } else {
    input.classList.remove('is-invalid');
    input.setCustomValidity('');
  }
}

// Aplica a los campos de empresa
document.addEventListener('DOMContentLoaded', () => {
  ['rutEmpresa', 'rutRepresentante'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => aplicarFormatoYValidacionRut(input));
      input.addEventListener('blur', () => aplicarFormatoYValidacionRut(input));
    }
  });

  document.querySelectorAll('input[name="usuarioRUT[]"]').forEach(input => {
    input.addEventListener('input', () => aplicarFormatoYValidacionRut(input));
    input.addEventListener('blur', () => aplicarFormatoYValidacionRut(input));
  });
});


// ACA: funcion para mostrar los socios
function agregarSocioDesdeDatos(datos) {
  const tipo = document.getElementById('tipoSociedad').value;
  const reglas = detallesSociedades[tipo];

  // Simula click en "Agregar socio"
  document.getElementById('btnAgregarSocio').click();

  // Tomamos el último socio agregado
  const socios = document.querySelectorAll('.socio-item');
  const socioItem = socios[socios.length - 1];

  // Completar campos básicos
  socioItem.querySelector('input[name="nombreSocio[]"]').value = datos.nombre;
  socioItem.querySelector('input[name="rutSocio[]"]').value = datos.rut;
  socioItem.querySelector('input[name="participacionSocio[]"]').value = datos.participacion;
  socioItem.querySelector('input[name="accionesSocio[]"]').value = datos.acciones;
  socioItem.querySelector('.fechaSocio')._flatpickr.setDate(datos.fechaIncorporacion);

  // Agregar métodos de pago
  const btnAgregarPago = socioItem.querySelector('.btnAgregarPago');

  datos.pagos.forEach(pago => {
    btnAgregarPago.click();

    const metodos = socioItem.querySelectorAll('.metodo-pago-item');
    const ultimoMetodo = metodos[metodos.length - 1];

    ultimoMetodo.querySelector('.accionesPorMetodo').value = pago.acciones;
    ultimoMetodo.querySelector('.capitalPorMetodo').value = pago.capitalPagado;

    const select = ultimoMetodo.querySelector('.tipoPagoIndividual');
    select.value = pago.tipo;

    // Forzar Choices si es necesario
    if (select.choicesInstance) {
      select.choicesInstance.setChoiceByValue(pago.tipo);
    }

    recalcularCapitalDesdeMetodos(socioItem);
  });

  validarSumaParticipacion();
  validarSumaAccionesSocios();
}

// ACA: funcion para mostrar los usuarios autorizados
function agregarUsuarioDesdeDatos(usuario) {
  // Simula click en "Agregar usuario autorizado"
  document.getElementById('btnAgregarUsuario').click();

  // Tomar el último bloque agregado
  const usuarios = document.querySelectorAll('.usuario-item');
  const usuarioItem = usuarios[usuarios.length - 1];

  // Completar campos
  usuarioItem.querySelector('input[name="nombreUsuario[]"]').value = usuario.nombre;
  usuarioItem.querySelector('input[name="rutUsuario[]"]').value = usuario.rut;
  usuarioItem.querySelector('input[name="cargoUsuario[]"]').value = usuario.cargo;
  usuarioItem.querySelector('input[name="correoUsuario[]"]').value = usuario.correo;
  usuarioItem.querySelector('input[name="telefonoUsuario[]"]').value = usuario.telefono;
}


 // Funcion para poner las regiones
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


// Funcion para actualizar las regiones
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

// Contador de caracteres
const razonInput = document.getElementById("razonSocial");
const contador = document.getElementById("contadorRazon");

razonInput.addEventListener("input", () => {
  contador.textContent = razonInput.value.length;
});

const nombreFantasiaInput = document.getElementById("nombreFantasia");
const contadorNombreFantasia = document.getElementById("contadorNombreFantasia");

nombreFantasiaInput.addEventListener("input", () => {
  contadorNombreFantasia .textContent = nombreFantasiaInput.value.length;
});


// Calcular valor acciones
function obtenerValorAccion() {
  const total = parseFloat(document.getElementById('capitalTotal').value);
  const cantidad = parseFloat(document.getElementById('cantidadAcciones').value);
  if (!isNaN(total) && !isNaN(cantidad) && cantidad > 0) {
    return total / cantidad;
  }
  return null;
}


// caltular capital total
function recalcularCapitalGlobalDesdeSocios() {
  const capitalTotalInput = document.getElementById('capitalTotal');
  const capitalPagadoInput = document.getElementById('capitalPagado');
  const capitalPorPagarInput = document.getElementById('capitalPorPagar');

  const totalCapital = parseFloat(capitalTotalInput.value) || 0;

  const totalCapitalPagado = Array.from(document.querySelectorAll('.capitalPagadoSocio'))
    .reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);

  capitalPagadoInput.value = Math.round(totalCapitalPagado);
  capitalPorPagarInput.value = Math.max(0, Math.round(totalCapital - totalCapitalPagado));

}


// actualizar el total pagado sociedad
function actualizarCapitalSocios() {
  const socios = document.querySelectorAll('.socio-item');
  socios.forEach(socio => {
    recalcularCapitalDesdeMetodos(socio);
  });
  recalcularCapitalGlobalDesdeSocios();
}



// metodos de pago socio
function configurarMetodosPagoParaSocio(socioItem) {
  const contenedor = socioItem.querySelector('.metodos-pago-container');
  const btnAgregar = socioItem.querySelector('.btnAgregarPago');

  btnAgregar.addEventListener('click', () => {
    const template = document.getElementById('templateMetodoPago');
    const clon = template.content.cloneNode(true);
    contenedor.appendChild(clon);

    const nuevoMetodo = contenedor.lastElementChild;

    const inputAcciones = nuevoMetodo.querySelector('.accionesPorMetodo');
    const inputCapitalMetodo = nuevoMetodo.querySelector('.capitalPorMetodo');
    const selectMetodo = nuevoMetodo.querySelector('.tipoPagoIndividual');
    const campoOtroMetodo = nuevoMetodo.querySelector('.campoOtroMetodo');
    const btnEliminar = nuevoMetodo.querySelector('.btnEliminarPago');

    // === VALIDACIÓN CAPITAL PAGADO
    function validarCapitalPorMetodo() {
      const acciones = parseFloat(inputAcciones.value);
      const capitalPagado = parseFloat(inputCapitalMetodo.value);
      const feedback = inputCapitalMetodo.nextElementSibling;
      const valorAccion = obtenerValorAccion();

      if (!isNaN(capitalPagado) && capitalPagado < 0) {
        inputCapitalMetodo.classList.add('is-invalid');
        feedback.textContent = `El capital pagado no puede ser menor a $0.`;
        feedback.classList.add('d-block');
        return;
      }

      if (!isNaN(acciones) && !isNaN(capitalPagado) && valorAccion !== null) {
        const maximoPermitido = acciones * valorAccion;
        if (capitalPagado > maximoPermitido) {
          inputCapitalMetodo.classList.add('is-invalid');
          feedback.textContent = `El capital pagado no puede superar $${Math.round(maximoPermitido).toLocaleString()}`;
          feedback.classList.add('d-block');
        } else {
          inputCapitalMetodo.classList.remove('is-invalid');
          feedback.textContent = '';
          feedback.classList.remove('d-block');
        }
      } else {
        inputCapitalMetodo.classList.remove('is-invalid');
        feedback.textContent = '';
        feedback.classList.remove('d-block');
      }
    }

    // === VALIDACIÓN INDIVIDUAL ACCIONES
    function validarAccionesPorMetodo() {
      const accionesMetodo = parseFloat(inputAcciones.value);
      const inputAccionesSocio = socioItem.querySelector('input[name="accionesSocio[]"]');
      const totalAccionesSocio = parseFloat(inputAccionesSocio?.value);
      const feedback = inputAcciones.nextElementSibling;

      let error = false;

      if (!isNaN(accionesMetodo)) {
        if (accionesMetodo < 1) {
          inputAcciones.classList.add('is-invalid');
          feedback.textContent = 'Debe ingresar al menos 1 acción.';
          feedback.classList.add('d-block');
          error = true;
        }

        if (!isNaN(totalAccionesSocio) && accionesMetodo > totalAccionesSocio) {
          inputAcciones.classList.add('is-invalid');
          feedback.textContent = `No puede superar las ${totalAccionesSocio} acciones del socio.`;
          feedback.classList.add('d-block');
          error = true;
        }
      }

      if (!error) {
        inputAcciones.classList.remove('is-invalid');
        feedback.textContent = '';
        feedback.classList.remove('d-block');
      }
    }

    // === VALIDACIÓN SUMA TOTAL DE ACCIONES
    function validarSumaAccionesPorMetodos() {
      const totalAccionesSocio = parseFloat(socioItem.querySelector('input[name="accionesSocio[]"]')?.value);
      const accionesInputs = socioItem.querySelectorAll('.accionesPorMetodo');
      const btnAñadir = socioItem.querySelector('.btnAgregarPago');
      let suma = 0;

      accionesInputs.forEach(input => {
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) suma += valor;
      });

      if (suma > totalAccionesSocio) {
        accionesInputs.forEach(input => {
          input.classList.add('is-invalid');
          const feedback = input.nextElementSibling;
          feedback.textContent = `La suma total excede las ${totalAccionesSocio} acciones del socio.`;
          feedback.classList.add('d-block');
        });
        btnAñadir.disabled = true;
      } else {
        // Solo limpia si no hay otro error previo
        accionesInputs.forEach(input => {
          if (!input.classList.contains('is-invalid')) {
            const feedback = input.nextElementSibling;
            feedback.textContent = '';
            feedback.classList.remove('d-block');
          }
        });

        btnAñadir.disabled = (suma === totalAccionesSocio);
      }
    }

    // === CONECTAR VALIDACIONES
    inputAcciones.addEventListener('input', validarAccionesPorMetodo);
    inputAcciones.addEventListener('input', validarCapitalPorMetodo);
    inputAcciones.addEventListener('input', validarSumaAccionesPorMetodos);
    inputCapitalMetodo.addEventListener('input', validarCapitalPorMetodo);
    inputAcciones.addEventListener('input', () => recalcularCapitalDesdeMetodos(socioItem));
    inputCapitalMetodo.addEventListener('input', () => recalcularCapitalDesdeMetodos(socioItem));

    // === BOTÓN ELIMINAR
    btnEliminar.addEventListener('click', () => {
      nuevoMetodo.remove();
      recalcularCapitalDesdeMetodos(socioItem);
    });

    // === SELECT: mostrar campo "otros"
    new Choices(selectMetodo, {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: '',
      placeholder: true
    });

    selectMetodo.addEventListener('change', () => {
      if (selectMetodo.value === 'otros') {
        campoOtroMetodo.classList.remove('d-none');
        campoOtroMetodo.querySelector('input').setAttribute('required', 'required');
      } else {
        campoOtroMetodo.classList.add('d-none');
        campoOtroMetodo.querySelector('input').removeAttribute('required');
        campoOtroMetodo.querySelector('input').value = '';
      }
    });
  });
}

// calcular % de los socios para validar que den el 100%
function validarSumaParticipacion() {
  const inputs = document.querySelectorAll('input[name="participacionSocio[]"]');
  const btnAgregar = document.querySelector('.btnAgregarSocio'); // Asegúrate de tener esta clase
  const mensaje = document.getElementById('mensajeParticipacionTotal');

  let suma = 0;
  inputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) suma += val;
  });

  if (!mensaje) return;

  if (suma < 100) {
    mensaje.textContent = `La suma total es ${suma.toFixed(2)}%. Faltan ${(100 - suma).toFixed(2)}%.`;
    mensaje.className = 'mt-2 d-block text-warning';
    if (btnAgregar) btnAgregar.disabled = false;
  } else if (suma > 100) {
    mensaje.textContent = `La suma total es ${suma.toFixed(2)}%. Se ha excedido el 100%.`;
    mensaje.className = 'mt-2 d-block text-danger';
    if (btnAgregar) btnAgregar.disabled = true;
  } else {
    mensaje.textContent = `La suma total es 100%.`;
    mensaje.className = 'mt-2 d-block text-success';
    if (btnAgregar) btnAgregar.disabled = true;
  }
}

// validar suma de las acciones socios
function validarSumaAccionesSocios() {
  const inputs = document.querySelectorAll('input[name="accionesSocio[]"]');
  const totalSociedad = parseFloat(document.getElementById('cantidadAcciones')?.value);
  const mensaje = document.getElementById('mensajeAccionesTotales');
  const btnAgregar = document.getElementById('btnAgregarSocio');
  const sociosActuales = document.querySelectorAll('.socio-item').length;
  const tipo = tipoSociedadSelect.value;
  const reglas = detallesSociedades[tipo];

  let suma = 0;
  inputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) suma += val;
  });

  // Si no hay mensaje, no continuar
  if (!mensaje) return;

  // Caso especial: aún no se define la cantidad de acciones
  if (isNaN(totalSociedad)) {
    mensaje.textContent = 'No se ha definido la cantidad total de acciones de la sociedad.';
    mensaje.className = 'mt-2 d-block text-warning';
    if (btnAgregar) btnAgregar.disabled = true;
    return;
  }

  // Caso especial: no hay socios todavía
  if (sociosActuales === 0) {
    mensaje.textContent = '';
    mensaje.className = 'mt-2 d-none';
    if (btnAgregar) btnAgregar.disabled = false;
    return;
  }

  // Evaluar la suma de acciones
  if (suma > totalSociedad) {
    mensaje.textContent = `La suma total de acciones asignadas es ${suma}. Excede las ${totalSociedad} disponibles.`;
    mensaje.className = 'mt-2 d-block text-danger';
    if (btnAgregar) btnAgregar.disabled = true;
  } else if (suma === totalSociedad) {
    mensaje.textContent = `Se han asignado exactamente ${totalSociedad} acciones.`;
    mensaje.className = 'mt-2 d-block text-success';
    if (btnAgregar) btnAgregar.disabled = true;
  } else {
    mensaje.textContent = `La suma total es ${suma}. Faltan ${totalSociedad - suma} acciones por asignar.`;
    mensaje.className = 'mt-2 d-block text-warning';
    if (btnAgregar) btnAgregar.disabled = false;
  }

  // Validación adicional por número máximo de socios
  if (reglas.sociosMax !== null && sociosActuales >= reglas.sociosMax) {
    if (btnAgregar) btnAgregar.disabled = true;
  }
}





// recalcular capital desde metodos de pago socio
function recalcularCapitalDesdeMetodos(socioItem) {
  const valorAccion = obtenerValorAccion();
  if (valorAccion === null) return;

  const metodos = socioItem.querySelectorAll('.metodo-pago-item');

  let totalCapitalPagado = 0;

  metodos.forEach(metodo => {
    const acciones = parseFloat(metodo.querySelector('.accionesPorMetodo')?.value) || 0;
    const capitalPagado = parseFloat(metodo.querySelector('.capitalPorMetodo')?.value) || 0;
    const inputDeuda = metodo.querySelector('.deudaPorMetodo');

    const deuda = Math.max(0, Math.round((acciones * valorAccion) - capitalPagado));
    inputDeuda.value = deuda;

    totalCapitalPagado += capitalPagado;
  });


  const cantidadAcciones = parseFloat(socioItem.querySelector('input[name="accionesSocio[]"]')?.value) || 0;
  const inputCapitalTotal = socioItem.querySelector('input[name="capitalTotalSocio[]"]');
  const inputCapitalPagado = socioItem.querySelector('input[name="capitalPagadoSocio[]"]');
  const inputCapitalPorPagar = socioItem.querySelector('input[name="capitalPorPagarSocio[]"]');

  const capitalTotal = cantidadAcciones * valorAccion;

  inputCapitalTotal.value = Math.round(capitalTotal);
  inputCapitalPagado.value = Math.round(totalCapitalPagado);
  inputCapitalPorPagar.value = Math.max(0, Math.round(capitalTotal - totalCapitalPagado));

  recalcularCapitalGlobalDesdeSocios();
}


// recalcular el valor de las acciones 
function actualizarCapitalSocios() {
  const socios = document.querySelectorAll('.socio-item');
  socios.forEach(socio => {
    recalcularCapitalDesdeMetodos(socio);
  });
}



// darle roles a los usuarios
function asignarRolesUsuarios() {

  document.querySelectorAll('.rolUsuario').forEach(select => {
    // Limpiar y cargar opciones básicas
    select.innerHTML = '';
    roles.forEach(rol => {
      const option = document.createElement('option');
      option.value = rol;
      option.textContent = rol;
      select.appendChild(option);
    });

   
    if (!select.classList.contains('choices-initialized')) {
      new Choices(select, {
        shouldSort: false,
        searchEnabled: false,
        itemSelectText: '',
      });
      select.classList.add('choices-initialized');
    }
  });
}





/**********************************************
 ************** DOMContentLoaded **************
 **********************************************/ 

// === LISTA GLOBAL DE ARCHIVOS HISTÓRICOS ===
const archivosCargados = [];
const tipoSociedadSelect = document.getElementById('tipoSociedad');
const btnAgregarSocio = document.getElementById('btnAgregarSocio');


/* donde se cargan las cosas, como fechas, inputs, etc*/
document.addEventListener('DOMContentLoaded', () => {

    tipoSociedadSelect.addEventListener('change', () => {
        const tipo = tipoSociedadSelect.value;
        const reglas = detallesSociedades[tipo];
        btnAgregarSocio.disabled = tipo === 'EIRL' || (reglas.sociosMax === 1);
        resetearSocios(reglas);
        
    });

    btnAgregarSocio.disabled = true;

    // 1. Obtener referencias a los select
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');
    const tipoPropiedadSelect = document.getElementById('tipoPropiedad'); 

    // 2. Poblar regiones 
    poblarSelectRegiones('region');

    // 3. Activar Choices en región
    const regionChoices = new Choices(regionSelect, {
      shouldSort: false,
      searchEnabled: true,
      itemSelectText: '',
      placeholder: true
    });

    // 4. Activar Choices en comuna 
    const comunaChoices = new Choices(comunaSelect, {
      shouldSort: false,
      searchEnabled: true,
      itemSelectText: '',
      placeholder: true
    });

    // 5. Activar Choices en tipo de propiedad
    const tipoPropiedadChoices = new Choices(tipoPropiedadSelect, {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: '',
      placeholder: true
    });

    // 6. Escuchar cambios en región para actualizar comunas
    regionSelect.addEventListener('change', function () {
      const regionSeleccionada = regionSelect.value;
      const comunas = regionesComunas[regionSeleccionada] || [];

      comunaChoices.clearStore();

      const opciones = comunas.map(comuna => ({
        value: comuna,
        label: comuna
      }));

      comunaChoices.setChoices(opciones, 'value', 'label', true);
    });

    // 7. Hacer comprobaciones de fechas
    const fechaConstitucionInput = document.getElementById("fechaConstitucion");
    const fechaInicioInput = document.getElementById("fechaInicio");

    const fpInicio = flatpickr(fechaInicioInput, {
      dateFormat: "d/m/Y",
      locale: "es"
    });

    flatpickr(fechaConstitucionInput, {
      dateFormat: "d/m/Y",
      maxDate: "today", 
      locale: "es",
      onChange: function (selectedDates) {
        if (selectedDates.length > 0) {
          // Permite el mismo día o posteriores
          fpInicio.set("minDate", selectedDates[0]);
        } else {
          fpInicio.set("minDate", null);
        }
      }
    });

    // Inicializar Choices y cargar opciones
    const tipoSociedadChoices = new Choices(tipoSociedadSelect, {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: '',
      placeholder: true
    });

    // Cargar las opciones por código
    tipoSociedadChoices.setChoices(opcionesSociedad, 'value', 'label', true);

    // 9. Actividad Económica (Choices.js, múltiple, máx 7)
    const actividadChoices = new Choices('#actividadEconomica', {
      removeItemButton: true,
      placeholder: true,
      maxItemCount: 7,
      searchEnabled: true,
      shouldSort: false,
      noResultsText: 'No se encontraron coincidencias',
      noChoicesText: 'No hay opciones disponibles',
      itemSelectText: '',
      maxItemText: (maxItemCount) => `Solo puedes seleccionar hasta ${maxItemCount} actividades.`
    });

    actividadChoices.setChoices(opcionesActividadEconomica, 'value', 'label', false);

    // 10. Régimen Tributario
    const regimenChoices = new Choices('#regimenTributario', {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: '',
      placeholder: true
    });

    regimenChoices.setChoices(opcionesRegimenTributario, 'value', 'label', true);

    // 11. Mutual de Seguridad
    const mutualChoices = new Choices('#mutual', {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: '',
      placeholder: true
    });

    mutualChoices.setChoices(opcionesMutual, 'value', 'label', true);

    // 12. Gratificación Legal
    const gratificacionChoices = new Choices('#gratificacionLegal', {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: '',
      placeholder: true
    });

    gratificacionChoices.setChoices(opcionesGratificacionLegal, 'value', 'label', true);

    // 13. Fecha de pago socios
    document.getElementById('capitalTotal').addEventListener('input', () => {
      recalcularCapitalGlobalDesdeSocios();
    });
    const inputFechaPagoGlobal = document.getElementById('fechaPagoGlobal');
    let fechaPagoGlobalActual = null;

    const hoy = new Date();
    const maximoFecha = new Date();
    maximoFecha.setMonth(hoy.getMonth() + 36);

    // Flatpickr para campo global
    flatpickr(inputFechaPagoGlobal, {
      dateFormat: "d/m/Y",
      locale: "es",
      minDate: hoy,
      maxDate: maximoFecha,
      onChange: function (selectedDates, dateStr) {
        aplicarFechaGlobal(dateStr);
      }
    });

    // También actualizar si el usuario reescribe o reelige la misma fecha
    inputFechaPagoGlobal.addEventListener('blur', () => {
      const dateStr = inputFechaPagoGlobal.value;
      if (dateStr) aplicarFechaGlobal(dateStr);
    });

    // Función global para aplicar la fecha a todos los socios
    function aplicarFechaGlobal(dateStr) {
      fechaPagoGlobalActual = dateStr;

      const fechas = document.querySelectorAll('.fechaPagoSocio');
      fechas.forEach(input => {
        input._flatpickr.setDate(dateStr);
      });
    }


    // 14. Lógica de agregar socios
    const contenedor = document.getElementById('contenedorSocios');
    const plantillaSocio = document.getElementById('plantillaSocio');
    let sociosAgregados = 0;

    // Escuchar cambio en tipo de sociedad
    tipoSociedadSelect.addEventListener('change', () => {
        const tipo = tipoSociedadSelect.value;
        const reglas = detallesSociedades[tipo];
        bloquearCamposAccionesYCapitalSiNoAplica(tipo);

        // Si no se permiten acciones, desactivar campos relacionados
        if (reglas.acciones === false) {
            desactivarCamposAcciones();
        }

        // Reset socios y habilitación inicial
        resetearSocios(reglas);

        // Validar si permite acciones
        const campoCantidadAcciones = document.getElementById('cantidadAcciones');
        const labelAcciones = document.querySelector('label[for="cantidadAcciones"]');

        if (reglas.acciones === false) {
            campoCantidadAcciones.value = '';
            campoCantidadAcciones.setAttribute('readonly', 'readonly');
            campoCantidadAcciones.placeholder = 'No aplica';
            campoCantidadAcciones.classList.add('bg-light');
            if (labelAcciones) labelAcciones.textContent += ' (Solo porcentaje)';
        } else {
            campoCantidadAcciones.removeAttribute('readonly');
            campoCantidadAcciones.placeholder = '';
            campoCantidadAcciones.classList.remove('bg-light');
            if (labelAcciones) labelAcciones.textContent = 'Cantidad de Acciones Totales';
        }
    });

    function resetearSocios(reglas) {
        const btnAgregarSocio = document.getElementById('btnAgregarSocio');
        const contenedor = document.getElementById('contenedorSocios');
        contenedor.innerHTML = ''; // Limpiar socios existentes
        btnAgregarSocio.disabled = reglas.sociosMax === 1; // Habilitar/Deshabilitar botón
    }


    function bloquearCamposAccionesYCapitalSiNoAplica(tipoSociedad) {
      const reglas = detallesSociedades[tipoSociedad];
      const campoCantidadAcciones = document.getElementById('cantidadAcciones');
      const campoCapitalTotal = document.getElementById('capitalTotal');

      const labelAcciones = document.querySelector('label[for="cantidadAcciones"]');
      const labelCapital = document.querySelector('label[for="capitalTotal"]');

      if (!reglas || reglas.acciones !== false) {
        // Habilitar campos
        campoCantidadAcciones.removeAttribute('readonly');
        campoCantidadAcciones.classList.remove('bg-light');
        campoCantidadAcciones.placeholder = '';
        labelAcciones.textContent = 'Cantidad de Acciones Totales';

        campoCapitalTotal.removeAttribute('readonly');
        campoCapitalTotal.classList.remove('bg-light');
        campoCapitalTotal.placeholder = '';
        labelCapital.textContent = 'Capital Total ($)';
      } else {
        // Bloquear campos si no aplica
        campoCantidadAcciones.value = '';
        campoCantidadAcciones.setAttribute('readonly', 'readonly');
        campoCantidadAcciones.classList.add('bg-light');
        campoCantidadAcciones.placeholder = 'No aplica';
        labelAcciones.textContent = 'Cantidad de Acciones Totales (No aplica)';

        // Asegurarse de que el campo de capital total no se bloquee
        campoCapitalTotal.removeAttribute('readonly');
        campoCapitalTotal.classList.remove('bg-light');
        campoCapitalTotal.placeholder = '';
        labelCapital.textContent = 'Capital Total ($)'; // No se modifica el texto del label
      }
    }


    


    // Agregar socio
    btnAgregarSocio.addEventListener('click', () => {
      const tipo = tipoSociedadSelect.value;
      const reglas = detallesSociedades[tipo];

      if (tipo === 'EIRL') return;

      if (reglas.sociosMax !== null && sociosAgregados >= reglas.sociosMax) {
        alert(`No se pueden agregar socios para esta sociedad.`);
        return;
      }
      

      sociosAgregados++;

      // Clonar plantilla
      const clon = plantillaSocio.content.cloneNode(true);
      const wrapper = document.createElement('div');
      wrapper.appendChild(clon);
      const socioHTML = wrapper.querySelector('.socio-item');
      contenedor.appendChild(socioHTML);

      const socioItem = socioHTML; 


      // validar acciones
      if (reglas.acciones === false) {
        const inputAcciones = socioItem.querySelector('input[name="accionesSocio[]"]');
        inputAcciones.value = '';
        inputAcciones.setAttribute('readonly', 'readonly');
        inputAcciones.placeholder = 'No aplica';
        inputAcciones.classList.add('bg-light');

        const btnAgregarPago = socioItem.querySelector('.btnAgregarPago');
        if (btnAgregarPago) btnAgregarPago.disabled = true;

        const metodosPago = socioItem.querySelectorAll('.accionesPorMetodo, .capitalPorMetodo');
        metodosPago.forEach(input => {
          input.setAttribute('readonly', 'readonly');
          input.classList.add('bg-light');
        });
      }


      // VALIDACIONES
      const inputParticipacion = socioItem.querySelector('input[name="participacionSocio[]"]');
      const inputAcciones = socioItem.querySelector('input[name="accionesSocio[]"]');

      // Seleccionamos los divs de feedback 
      const feedbackParticipacion = inputParticipacion.nextElementSibling;
      const feedbackAcciones = inputAcciones.nextElementSibling;

      // Helpers
      function limpiarErrores(feedback, input) {
        input.classList.remove('is-invalid');
        feedback.textContent = '';
        feedback.classList.remove('d-block'); 
      }

      function mostrarError(feedback, input, mensaje) {
        console.log("⚠️ Ejecutando mostrarError:", mensaje);
        input.classList.add('is-invalid');
        feedback.textContent = mensaje;
        feedback.classList.add('d-block');
        feedback.style.display = 'block';
      }

      // Validación combinada: participación válida y coherente
      function validarParticipacionTotal() {
        limpiarErrores(feedbackParticipacion, inputParticipacion);

        const valor = parseFloat(inputParticipacion.value);
        const totalAcciones = parseFloat(document.getElementById('cantidadAcciones').value);
        const accionesSocio = parseFloat(inputAcciones.value);

        let errorMostrado = false;

        if (!isNaN(valor)) {
          if (valor < 0.1 || valor > 100) {
            mostrarError(feedbackParticipacion, inputParticipacion, 'La participación debe estar entre 0.1% y 100%.');
            errorMostrado = true;
          }
        }

        if (!errorMostrado && !isNaN(totalAcciones) && totalAcciones > 0 && !isNaN(accionesSocio) && !isNaN(valor)) {
          const participacionCalculada = (accionesSocio / totalAcciones) * 100;
          const diferencia = Math.abs(participacionCalculada - valor);

          if (diferencia > 0.1) {
            mostrarError(feedbackParticipacion, inputParticipacion, 'La participación no coincide con la cantidad de acciones.');
          }
        }
      }

      // Validación 2: Acciones del socio ≤ total de acciones y ≥ 1
      function validarAccionesVsTotales() {
        limpiarErrores(feedbackAcciones, inputAcciones);

        const totalAcciones = parseFloat(document.getElementById('cantidadAcciones').value);
        const accionesSocio = parseFloat(inputAcciones.value);

        if (!isNaN(accionesSocio)) {
          if (accionesSocio < 1) {
            mostrarError(feedbackAcciones, inputAcciones, 'La cantidad de acciones no puede ser menor a 1.');
            return;
          }
        }

        if (!isNaN(accionesSocio) && !isNaN(totalAcciones)) {
          if (accionesSocio > totalAcciones) {
            mostrarError(feedbackAcciones, inputAcciones, 'El número de acciones del socio no puede ser mayor al total de la sociedad.');
          }
        }
      }

      // EVENTOS - Ejecutar validaciones al salir o escribir
      inputParticipacion.addEventListener('blur', validarParticipacionTotal);
      inputParticipacion.addEventListener('input', validarParticipacionTotal);
      inputAcciones.addEventListener('blur', () => {
        validarParticipacionTotal();
        validarAccionesVsTotales();
      });
      inputAcciones.addEventListener('input', () => {
        validarParticipacionTotal();
        validarAccionesVsTotales();
      });





      const btnToggle = socioItem.querySelector('.btnToggleSocio');
      const contenido = socioItem.querySelector('.row');

     btnToggle.addEventListener('click', () => {
      const icono = btnToggle.querySelector('i');
      contenido.classList.toggle('d-none');
      icono.classList.toggle('bi-chevron-down');
      icono.classList.toggle('bi-chevron-right');

      if (contenido.classList.contains('d-none')) {
        actualizarResumen();
        resumenDiv.style.display = 'block';
      } else {
        resumenDiv.style.display = 'none';
      }

      validarSumaParticipacion();
      validarSumaAccionesSocios();
    });


      const resumenDiv = socioItem.querySelector('.resumen-socio');

      function actualizarResumen() {
        const nombre = socioItem.querySelector('input[name="nombreSocio[]"]').value || '—';
        const rut = socioItem.querySelector('input[name="rutSocio[]"]').value || '—';
        const participacion = socioItem.querySelector('input[name="participacionSocio[]"]').value || '—';
        const capital = socioItem.querySelector('input[name="capitalPagadoSocio[]"]').value || '0';

        resumenDiv.textContent = `${nombre} – ${rut} – ${participacion}% – $${Number(capital).toLocaleString()} pagados`;
      }

      ['nombreSocio[]', 'rutSocio[]', 'participacionSocio[]', 'capitalPagadoSocio[]'].forEach(name => {
      const input = socioItem.querySelector(`input[name="${name}"]`);
        input.addEventListener('input', () => {
          if (resumenDiv.style.display === 'block') {
            actualizarResumen();
          }
        });
      });


      configurarMetodosPagoParaSocio(socioItem);


      // Fecha incorporación (individual editable)
      flatpickr(socioItem.querySelector('.fechaSocio'), {
        dateFormat: "d/m/Y",
        locale: "es"
      });

      // Fecha de pago (sin interacción directa)
      const inputFechaPago = socioItem.querySelector('.fechaPagoSocio');
      flatpickr(inputFechaPago, {
        dateFormat: "d/m/Y",
        locale: "es",
        allowInput: false,
        clickOpens: false,
        minDate: hoy,
        maxDate: maximoFecha,
        defaultDate: fechaPagoGlobalActual || null
      });

      // Aplicar valor si ya se había seleccionado antes
      if (fechaPagoGlobalActual) {
        inputFechaPago._flatpickr.setDate(fechaPagoGlobalActual);
      }
      
      // Calcular capital por pagar
      inputAcciones.addEventListener('input', () => {
        recalcularCapitalDesdeMetodos(socioItem);
      });
      const inputPagado = socioItem.querySelector('input[name="capitalPagadoSocio[]"]');
      const inputPorPagar = socioItem.querySelector('input[name="capitalPorPagarSocio[]"]');

      // Hacerlo solo lectura (no editable)
      inputPorPagar.readOnly = true;

      // Calcular capital total
      const inputCapitalTotal = socioItem.querySelector('input[name="capitalTotalSocio[]"]');

      // Hacerlo solo lectura
      inputCapitalTotal.readOnly = true;


      // BOTÓN ELIMINAR
      const btnEliminar = socioItem.querySelector('.btnEliminarSocio');
      btnEliminar.addEventListener('click', () => {
        socioItem.remove();

      // 🔁 Recalcular número real de socios existentes
      const sociosActuales = document.querySelectorAll('.socio-item').length;
      sociosAgregados = sociosActuales;

      const tipo = tipoSociedadSelect.value;
      const reglas = detallesSociedades[tipo];

      // ✅ Activar botón si aún se pueden agregar socios
      if (reglas.sociosMax === null || sociosAgregados < reglas.sociosMax) {
        btnAgregarSocio.disabled = false;
      }

        recalcularCapitalGlobalDesdeSocios();
        validarSumaParticipacion();
        validarSumaAccionesSocios();
      });
    });

    // 15. Realcular valores acciones
    document.getElementById('capitalTotal').addEventListener('input', actualizarCapitalSocios);
    document.getElementById('cantidadAcciones').addEventListener('input', actualizarCapitalSocios);


    // 16. Usuarios
    asignarRolesUsuarios();

    document.querySelectorAll('.togglePassword').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.input-group').querySelector('.inputPassword');
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('bi-eye');
          icon.classList.add('bi-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.remove('bi-eye-slash');
          icon.classList.add('bi-eye');
        }
      });
    });

    // 17. Datos Históricos
    const inputArchivo = document.getElementById('inputArchivoHistorico');
    const listaArchivos = document.getElementById('listaArchivosHistoricos');


    inputArchivo.addEventListener('change', () => {
      const nuevosArchivos = Array.from(inputArchivo.files);

      nuevosArchivos.forEach(archivo => {
        // evitar duplicados por nombre y tamaño
        if (!archivosCargados.some(f => f.name === archivo.name && f.size === archivo.size)) {
          archivosCargados.push(archivo);
        }
      });

      renderizarListaArchivos();
      inputArchivo.value = ''; // permitir seleccionar el mismo archivo otra vez
    });

    function renderizarListaArchivos() {
      listaArchivos.innerHTML = '';

      if (archivosCargados.length === 0) {
        listaArchivos.innerHTML = '<li class="list-group-item text-muted">No hay archivos agregados.</li>';
        return;
      }

      archivosCargados.forEach((archivo, index) => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';

        item.innerHTML = `
          <span>${archivo.name}</span>
          <div>
            <button type="button" class="btn btn-sm btn-outline-primary me-2 btnDescargarArchivo" data-nombre="${archivo.name}">
              <i class="bi bi-download"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger" data-index="${index}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        `;

        listaArchivos.appendChild(item);
      });

      // Evento para eliminar
      listaArchivos.querySelectorAll('button[data-index]').forEach(btn => {
        btn.addEventListener('click', () => {
          const index = parseInt(btn.dataset.index);
          archivosCargados.splice(index, 1);
          renderizarListaArchivos();
        });
      });

      // Evento para descarga (solo evento, no descarga directa)
      listaArchivos.querySelectorAll('.btnDescargarArchivo').forEach(btn => {
        btn.addEventListener('click', () => {
          const nombreArchivo = btn.getAttribute('data-nombre');
          
          // ACA: dispara evento al backend para descargar el archivo histórico
          console.log("Solicitar descarga de:", nombreArchivo); // -> se elimina esta linea, es solo un ejemplo para mostrar en consola.

          // Por ejemplo, puedes usar:
          // fetch(`/api/descargar-historico/${nombreArchivo}`)
          //   .then(response => response.blob())
          //   .then(blob => {
          //     const url = URL.createObjectURL(blob);
          //     const link = document.createElement('a');
          //     link.href = url;
          //     link.download = nombreArchivo;
          //     document.body.appendChild(link);
          //     link.click();
          //     link.remove();
          //     URL.revokeObjectURL(url);
          //   });
        });
      });
    }

    // 18. definir opciones de género del representante legal
    const generoChoices = new Choices('#generoRepresentante', {
      searchEnabled: false,
      shouldSort: false,
    });

    generoChoices.setChoices(
      [
        { value: '', label: 'Seleccione una opción', disabled: true, selected: true },
        { value: 'Hombre', label: 'Hombre' },
        { value: 'Mujer', label: 'Mujer' },
        { value: 'Otro', label: 'Otro' }
      ],
      'value',
      'label',
      false
    );

    // mostrar campo "Especifique" si elige "Otro"
    const selectGenero = document.getElementById('generoRepresentante');
    const campoGeneroOtro = document.getElementById('campoGeneroOtro');

    selectGenero.addEventListener('change', () => {
      if (selectGenero.value === 'Otro') {
        campoGeneroOtro.classList.remove('d-none');
        campoGeneroOtro.querySelector('input').setAttribute('required', 'required');
      } else {
        campoGeneroOtro.classList.add('d-none');
        campoGeneroOtro.querySelector('input').removeAttribute('required');
        campoGeneroOtro.querySelector('input').value = '';
      }
    });




});


// Validaciones extras
document.addEventListener('input', e => {
  if (e.target.matches('input[name="participacionSocio[]"]')) {
    validarSumaParticipacion();
  }
});

document.addEventListener('input', e => {
  if (e.target.matches('input[name="accionesSocio[]"]')) {
    validarSumaAccionesSocios();
  }
});

// === OBTENER DATOS DE LA EMPRESA DESDE EL BACKEND aca===
async function fetchDatosEmpresa() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    alert("⚠️ No estás autenticado. Redirigiendo al login...");
    window.location.href = "../Login/view_login.html";
    return;
  }

  try {
    const res = await fetch("https://back-end-fastapi-production.up.railway.app/empresa/full", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("❌ Error al cargar empresa:", error);
      alert(error.detail || "No se pudo obtener la empresa.");
      return;
    }

    const data = await res.json();
    console.log("✅ Empresa cargada:", data);

    // Usamos tu función ya existente
    cargarDatosEmpresa(data);

    // Poner nombre de la empresa/usuario en el header
    setUserInitial(data.nombre_fantasia || "Empresa");

  } catch (err) {
    console.error("❌ Error de conexión:", err);
    alert("No se pudo conectar al servidor.");
  }
}

// Ejecutar al entrar a la página
document.addEventListener("DOMContentLoaded", fetchDatosEmpresa);


