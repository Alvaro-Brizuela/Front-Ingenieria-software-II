/* =================================================================
   FUNCIONALIDAD ESPECÍFICA PARA CREAR CONTRATOS
   ================================================================= */
document.addEventListener('DOMContentLoaded', () => {

    const contratoForm = document.getElementById('contratoForm');
    const clausulasContainer = document.getElementById('clausulasContainer');
    const btnAgregarClausulaModal = document.getElementById('btnAgregarClausulaModal');
    const selectClausula = document.getElementById('selectClausula');
    const noClausulasAlert = document.getElementById('noClausulasAlert');

    // Mapeo simple de cláusulas a su contenido para simulación
    const clausulasDisponibles = {
        'Cláusula de Confidencialidad': 'El trabajador se compromete a mantener la más estricta confidencialidad sobre toda la información comercial, técnica y operativa de la empresa.',
        'Cláusula de No Competencia': 'Durante la vigencia del contrato, el trabajador no podrá prestar servicios a ninguna empresa que compita directamente con el empleador.',
        'Cláusula de Propiedad Intelectual': 'Toda obra o invención creada por el trabajador en el desempeño de sus funciones será de propiedad exclusiva de la empresa.',
    };
    let clausulasSeleccionadas = [];

    // Función para obtener datos de la empresa (simulación de API)
    const obtenerDatosEmpresa = async () => {
        // <<<<<<<<<< PLACEHOLDER DE LA RUTA DEL API >>>>>>>>>>
        const apiRutaEmpresa = '/api/v1/empresa/datos'; 
        console.log(`Simulando fetch a: ${apiRutaEmpresa}`);

        // Datos de ejemplo que serían devueltos por la API
        const datosEmpresa = {
            nombre: 'EMPRESA DE RESTAURANT Y MULTISERVICIOS GCM SPA',
            rut: '77.795.895-K',
            representanteLegal: 'Don GUIDO RAMÓN COLIPI MORA',
            rutRepresentante: '9.756.078-1',
            domicilioRepresentante: 'AVDA. GABRIELA 1856, comuna de PUENTE ALTO, ciudad de SANTIAGO'
        };

        // Rellenar los campos del formulario con los datos de la empresa
        document.getElementById('nombreEmpresa').value = datosEmpresa.nombre;
        document.getElementById('rutEmpresa').value = datosEmpresa.rut;
        document.getElementById('representanteLegal').value = datosEmpresa.representanteLegal;
        document.getElementById('rutRepresentante').value = datosEmpresa.rutRepresentante;
        document.getElementById('domicilioRepresentante').value = datosEmpresa.domicilioRepresentante;

        // Marcar los campos como de solo lectura
        document.getElementById('nombreEmpresa').readOnly = true;
        document.getElementById('rutEmpresa').readOnly = true;
        document.getElementById('representanteLegal').readOnly = true;
        document.getElementById('rutRepresentante').readOnly = true;
        document.getElementById('domicilioRepresentante').readOnly = true;
    };

    obtenerDatosEmpresa();

    const renderizarClausulas = () => {
        if (clausulasSeleccionadas.length === 0) {
            noClausulasAlert.classList.remove('d-none');
        } else {
            noClausulasAlert.classList.add('d-none');
        }

        clausulasContainer.innerHTML = '';
        
        clausulasSeleccionadas.forEach((clausula, index) => {
            const clausulaDiv = document.createElement('div');
            clausulaDiv.className = 'card mb-2';
            clausulaDiv.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="card-title fw-bold">CLÁUSULA ${index + 1}: ${clausula.titulo}</h6>
                        <button type="button" class="btn btn-sm btn-danger eliminar-clausula" data-index="${index}">
                            <i class="bi bi-x-circle-fill"></i>
                        </button>
                    </div>
                    <p class="card-text">${clausula.contenido}</p>
                </div>
            `;
            clausulasContainer.appendChild(clausulaDiv);
        });
    };

    btnAgregarClausulaModal.addEventListener('click', () => {
        const tituloSeleccionado = selectClausula.value;
        if (tituloSeleccionado) {
            const contenido = clausulasDisponibles[tituloSeleccionado];
            if (contenido) {
                clausulasSeleccionadas.push({ titulo: tituloSeleccionado, contenido: contenido });
                renderizarClausulas();
                const modal = bootstrap.Modal.getInstance(document.getElementById('agregarClausulaModal'));
                modal.hide();
            }
        } else {
            alert('Por favor, selecciona una cláusula.');
        }
    });

    clausulasContainer.addEventListener('click', (event) => {
        if (event.target.closest('.eliminar-clausula')) {
            const index = event.target.closest('.eliminar-clausula').dataset.index;
            clausulasSeleccionadas.splice(index, 1);
            renderizarClausulas();
        }
    });

    contratoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const datosContrato = {
            ciudadFirma: document.getElementById('ciudadFirma').value,
            fechaContrato: document.getElementById('fechaContrato').value,
            nombreEmpresa: document.getElementById('nombreEmpresa').value,
            rutEmpresa: document.getElementById('rutEmpresa').value,
            representanteLegal: document.getElementById('representanteLegal').value,
            rutRepresentante: document.getElementById('rutRepresentante').value,
            domicilioRepresentante: document.getElementById('domicilioRepresentante').value,
            nombreTrabajador: document.getElementById('nombreTrabajador').value,
            nacionalidadTrabajador: document.getElementById('nacionalidadTrabajador').value,
            rutTrabajador: document.getElementById('rutTrabajador').value,
            estadoCivilTrabajador: document.getElementById('estadoCivilTrabajador').value,
            fechaNacimientoTrabajador: document.getElementById('fechaNacimientoTrabajador').value,
            domicilioTrabajador: document.getElementById('domicilioTrabajador').value,
            cargoTrabajador: document.getElementById('cargoTrabajador').value,
            lugarTrabajo: document.getElementById('lugarTrabajo').value,
            sueldo: document.getElementById('sueldo').value,
            jornada: document.getElementById('jornada').value,
            descripcionJornada: document.getElementById('descripcionJornada').value,
            clausulasAdicionales: clausulasSeleccionadas
        };

        const camposObligatorios = ['ciudadFirma', 'fechaContrato', 'nombreTrabajador', 'nacionalidadTrabajador', 'rutTrabajador', 'estadoCivilTrabajador', 'fechaNacimientoTrabajador', 'domicilioTrabajador', 'cargoTrabajador', 'lugarTrabajo', 'sueldo', 'jornada', 'descripcionJornada'];
        for (const campo of camposObligatorios) {
            if (!document.getElementById(campo).value.trim()) {
                alert('Por favor, completa todos los campos del contrato.');
                return;
            }
        }
        
        const textoContrato = generarTextoContrato(datosContrato, clausulasSeleccionadas);
        console.log("TEXTO FINAL DEL CONTRATO:");
        console.log(textoContrato);

        alert('¡Contrato generado con éxito! (Simulación. Revisa la consola para ver el texto)');
    });

    // Función para generar el texto completo del contrato
    const generarTextoContrato = (datos, clausulas) => {
        
        const fechaContrato = new Date(datos.fechaContrato);
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fechaContrato.toLocaleDateString('es-ES', opcionesFecha).toUpperCase();

        const fechaNacimiento = new Date(datos.fechaNacimientoTrabajador);
        const fechaNacimientoFormateada = fechaNacimiento.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
        
        // Párrafo inicial
        let texto = `CONTRATO DE TRABAJO POR OBRA O FAENA\n\n`;
        texto += `En ${datos.ciudadFirma.toUpperCase()} a ${fechaFormateada}, entre la sociedad denominada ${datos.nombreEmpresa} rol único tributario número ${datos.rutEmpresa} Representada por ${datos.representanteLegal} de nacionalidad Chileno, cédula nacional de identidad número ${datos.rutRepresentante}, ambos domiciliados en ${datos.domicilioRepresentante}, por una parte y en adelante también “El Empleador” o “La Empresa”; y por la otra, don(a) ${datos.nombreTrabajador} de nacionalidad ${datos.nacionalidadTrabajador}, nacido el ${fechaNacimientoFormateada}, cédula de identidad número ${datos.rutTrabajador}, estado civil ${datos.estadoCivilTrabajador}, domiciliado en ${datos.domicilioTrabajador}, en adelante “El Trabajador”, los comparecientes mayores de edad, quienes han convenido en celebrar el siguiente Contrato de Trabajo por Obra o Faena.\n\n`;

        // Cláusula PRIMERO
        texto += `PRIMERO: ${datos.nombreEmpresa}, representada del modo indicado en la comparecencia, contrata a don ${datos.nombreTrabajador}, quien se compromete y obliga a ejecutar el trabajo de ${datos.cargoTrabajador}, prestando estos servicios en la obra denominada LA FLORIDA ubicada en CALLE PUDETO ESQUINA MEMBRILLAR, comuna de La Florida, ciudad de ${datos.ciudadFirma.toUpperCase()}.\n\n`;

        // Cláusula fija
        texto += `Con todo, el empleador podrá alterar la naturaleza de los servicios o el sitio o recinto en que ellos deban prestarse, a condición de que se trate de labores similares, que el nuevo sitio o recinto quede dentro del territorio nacional, sin que ello importe un menos cabo para el trabajador.\n\n`;

        // Cláusula SEGUNDO
        texto += `SEGUNDO La Jornada de trabajo será de ${datos.jornada} horas. Semanales de acuerdo a la siguiente distribución diaria: ${datos.descripcionJornada}. La jornada de trabajo será interrumpida con un descanso de 60 MINUTOS, entre las 13:00 y las 14:00 horas, destinados a la colación, tiempo que en ningún caso será imputable al tiempo de trabajo. Por circunstancias que afecten a todo el proceso de la empresa o establecimiento o alguna de sus unidades o conjuntos operativos, podrá el empleador alterar la distribución de la jornada de trabajo convenida hasta en sesenta minutos, sea anticipando o postergando la hora de ingreso al trabajo, debiendo dar el aviso correspondiente al trabajador con 30 días de anticipación a lo menos.\n\n`;
        
        // Cláusula TERCERO: NUEVO TEXTO
        texto += `TERCERO. El presente contrato se considera celebrado por obra o faena, entendiendo por tal la labor específica a realizar en la obra o lugar señalado en la cláusula anterior. En consecuencia, la vigencia del mismo se extenderá por todo el lapso de tiempo que el trabajador demore en realizar la obra o faena para la cual fue contratado, y terminará una vez que se dé por finalizada la misma. No obstante, las partes convienen en que el empleador podrá poner término a este contrato, de acuerdo a las causales contempladas en el artículo 161 y 161 bis del Código del Trabajo. El contrato de trabajo por obra o faena, no requiere de una duración mínima, pudiendo, por lo tanto, terminar en cualquier momento, una vez que el empleador considere que ha terminado la faena para la cual fue contratado el trabajador. En todo caso, la duración del contrato no podrá exceder de 6 meses, contados desde la fecha de su inicio, sin perjuicio de lo establecido en el inciso 1° del artículo 159 del Código del Trabajo.\n\n`;

        // Agregar cláusulas dinámicas (las que el usuario agregue)
        if (clausulas.length > 0) {
            clausulas.forEach((clausula, index) => {
                const numeroClausula = index + 4; // Ahora inicia en CUARTO
                texto += `CLÁUSULA ${numeroClausula}: ${clausula.contenido}\n\n`;
            });
        }
        
        return texto;
    };

    renderizarClausulas();
});