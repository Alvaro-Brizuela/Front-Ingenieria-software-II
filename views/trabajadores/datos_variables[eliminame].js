// Aqui van todas las nacionalidades
const paises = ["Chile","Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita",
  "Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica",
  "Belice","Benín","Bhután","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria",
  "Burkina Faso","Burundi","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","China","Chipre","Ciudad del Vaticano","Colombia",
  "Comoras","Congo","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador",
  "Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas",
  "Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guinea Ecuatorial","Guinea-Bisáu","Guyana",
  "Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica",
  "Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kosovo","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia",
  "Liechtenstein","Lituania","Luxemburgo","Macedonia del Norte","Madagascar","Malasia","Malaui","Maldivas","Mali","Malta","Marruecos","Mauricio",
  "Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria",
  "Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal",
  "Puerto Rico","Reino Unido","República Centroafricana","República Checa","República Democrática del Congo","República Dominicana","Ruanda","Rumania",
  "Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles",
  "Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Sudáfrica","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Suazilandia","Tailandia","Tanzania",
  "Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu",
  "Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"
];

// Aqui van las regiones
const regiones = [
    "XV Arica y Parinacota","I Tarapacá","II Antofagasta","III Atacama",
    "IV Coquimbo","V Valparaíso","VI Libertador General Bernardo O'Higgins","VII Maule","VIII Biobío",
    "IX la Araucanía","XIV los Ríos","X los Lagos","XI Aysén","XII Magallanes y Antártica Chilena","Metropolitana de Santiago"
]

// Aqui van las Comunas
const comunas = [
    "Arica","Camarones","Putre","General Lagos","Alto Hospicio","Iquique","Huara","Camiña","Colchane","Pica","Pozo Almonte","Tocopilla",
    "María Elena","Calama","Ollagüe","San Pedro de Atacama","Antofagasta","Mejillones","Sierra Gorda","Taltal","Chañaral",
    "Diego de Almagro","Copiapó","Caldera","Tierra Amarilla","Vallenar","Freirina","Huasco","Alto del Carmen","La Serena","La Higuera",
    "Coquimbo","Andacollo","Vicuña","Paihuano","Ovalle","Río Hurtado","Monte Patria","Combarbalá","Punitaqui","Illapel","Salamanca","Los Vilos",
    "Canela","La Ligua","Petorca","Cabildo","Zapallar","Papudo","Los Andes","San Esteban","Calle Larga","Rinconada","San Felipe","Putaendo","Santa María",
    "Panquehue","Llaillay","Catemu","Quillota","La Cruz","Calera","Nogales","Hijuelas","Limache","Olmué","Valparaíso","Viña del Mar","Quintero","Puchuncaví",
    "Quilpué","Villa Alemana","Casablanca","Concón","Juan Fernández","San Antonio","Cartagena","El Tabo","El Quisco","Algarrobo","Santo Domingo",
    "Isla de Pascua","Rancagua","Graneros","Mostazal","Codegua","Machalí","Olivar","Requinoa","Rengo","Malloa","Quinta de Tilcoco","San Vicente","Pichidegua",
    "Peumo","Coltauco","Coinco","Doñihue","Las Cabras","San Fernando","Chimbarongo","Placilla","Nancagua","Chépica","Santa Cruz","Lolol","Pumanque","Palmilla",
    "Peralillo","Pichilemu","Navidad","Litueche","La Estrella","Marchihue","Paredones","Curicó","Teno","Romeral","Molina","Sagrada Familia","Hualañé","Licantén",
    "Vichuquén","Rauco","Talca","Pelarco","Río Claro","San Clemente","Maule","San Rafael","Empedrado","Pencahue","Constitución","Curepto","Linares","Yerbas Buenas",
    "Colbún","Longaví","Parral","Retiro","Villa Alegre","San Javier","Cauquenes","Pelluhue","Chanco","Chillán","San Carlos","Ñiquén","San Fabián","Coihueco","Pinto",
    "San Ignacio","El Carmen","Yungay","Pemuco","Bulnes","Quillón","Ránquil","Portezuelo","Coelemu","Treguaco","Cobquecura","Quirihue","Ninhue","San Nicolás","Chillán Viejo",
    "Alto Biobío","Los Angeles","Cabrero","Tucapel","Antuco","Quilleco","Santa Bárbara","Quilaco","Mulchén","Negrete","Nacimiento","Laja","San Rosendo","Yumbel","Concepción",
    "Talcahuano","Penco","Tomé","Florida","Hualpén","Hualqui","Santa Juana","Lota","Coronel","San Pedro de la Paz","Chiguayante","Lebu","Arauco","Curanilahue","Los Alamos",
    "Cañete","Contulmo","Tirua","Angol","Renaico","Collipulli","Lonquimay","Curacautín","Ercilla","Victoria","Traiguén","Lumaco","Purén","Los Sauces","Temuco","Lautaro","Perquenco",
    "Vilcún","Cholchol","Cunco","Melipeuco","Curarrehue","Pucón","Villarrica","Freire","Pitrufquén","Gorbea","Loncoche","Toltén","Teodoro Schmidt","Saavedra","Carahue","Nueva Imperial",
    "Galvarino","Padre las Casas","Valdivia","Mariquina","Lanco","Máfil","Corral","Los Lagos","Panguipulli","Paillaco","La Unión","Futrono","Río Bueno","Lago Ranco","Osorno","San Pablo",
    "Puyehue","Puerto Octay","Purranque","Río Negro","San Juan de la Costa","Puerto Montt","Puerto Varas","Cochamó","Calbuco","Maullín","Los Muermos","Fresia","Llanquihue","Frutillar",
    "Castro","Ancud","Quemchi","Dalcahue","Curaco de Vélez","Quinchao","Puqueldón","Chonchi","Queilén","Quellón","Chaitén","Hualaihué","Futaleufú","Palena","Coyhaique","Lago Verde",
    "Aysén","Cisnes","Guaitecas","Chile Chico","Río Ibánez","Cochrane","O'Higgins","Tortel","Natales","Torres del Paine","Punta Arenas","Río Verde","Laguna Blanca","San Gregorio","Porvenir",
    "Primavera","Timaukel","Cabo de Hornos","Antártica","Santiago","Independencia","Conchalí","Huechuraba","Recoleta","Providencia","Vitacura","Lo Barnechea","Las Condes","Ñuñoa","La Reina",
    "Macul","Peñalolén","La Florida","San Joaquín","La Granja","La Pintana","San Ramón","San Miguel","La Cisterna","El Bosque","Pedro Aguirre Cerda","Lo Espejo","Estación Central",
    "Cerrillos","Maipú","Quinta Normal","Lo Prado","Pudahuel","Cerro Navia","Renca","Quilicura","Colina","Lampa","Tiltil","Puente Alto","San José de Maipo","Pirque","San Bernardo",
    "Buin","Paine","Calera de Tango","Melipilla","María Pinto","Curacaví","Alhué","San Pedro","Talagante","Peñaflor","Isla de Maipo","El Monte","Padre Hurtado"
]

// Lista de los afp 
const afps = [
    "AFP CUPRUM","AFP HABITAT","AFP PLANVITAL","AFP PROVIDA","AFP MODELO","AFP UNO","SIN AFP"
]

//Lista de las instituciones de salud 
const nombreSalud = [
    "FONASA","BANMEDICA","COLMENA","CONSALUD","CRUZ BLANCA","NUEVA MASVIDA","VIDA TRES","ESENCIAL"
]

// Muestra los nombres de los jefes
const nombreJefes = [
    "Jefe 1","Jefe 2","Jefe 3","Jefe 4","Jefe 5","Jefe 6","Jefe manuel"
]

// Emulación de contratos del trabajador (para mostrar en la página)
window.CONTRATOS_TRABAJADOR = [
    {
        nombre: "Contrato 2022.pdf",
        url: "archivos/contrato_2022.pdf"
    },
    {
        nombre: "Contrato 2023.pdf",
        url: "archivos/contrato_2023.pdf"
    }
];

// Ejemplo de documentos subidos (para pruebas, si quieres simular la carga inicial de documentos)
window.DOCUMENTOS_TRABAJADOR = [
    { nombre: "Certificado AFP.pdf", url: "archivos/certificado_afp.pdf" },
    { nombre: "Licencia médica.jpg", url: "archivos/licencia_medica.jpg" }
]

// ==================== BACKEND DE PRUEBA (ELIMINAR AL CONECTAR BACKEND REAL) ====================
// Estas funciones simulan endpoints del backend usando los datos de arriba.
// Debes ELIMINAR todo este bloque cuando conectes el backend real.

(function() {
    // Simula fetch para contratos del trabajador
    window.fetch = (function(origFetch) {
        return function(url, options) {
            // Contratos del trabajador
            if (url === 'URL_DEL_BACKEND_CONTRATOS') {
                return Promise.resolve({
                    json: () => Promise.resolve(window.CONTRATOS_TRABAJADOR.slice())
                });
            }
            // Documentos del trabajador (listar)
            if (url === 'URL_DEL_BACKEND_LISTAR') {
                return Promise.resolve({
                    json: () => Promise.resolve(window.DOCUMENTOS_TRABAJADOR.slice())
                });
            }
            // Subir documentos
            if (url === 'URL_DEL_BACKEND_SUBIR') {
                // Simula subida y agrega a la lista global
                return new Promise(resolve => {
                    setTimeout(() => {
                        // Simula nombres y urls
                        const docs = [];
                        if (options && options.body && options.body.getAll) {
                            const files = options.body.getAll('documentos');
                            files.forEach(f => {
                                const nombre = f.name || 'documento.pdf';
                                const url = 'archivos/' + nombre;
                                const doc = { nombre, url };
                                window.DOCUMENTOS_TRABAJADOR.push(doc);
                                docs.push(doc);
                            });
                        }
                        resolve({ json: () => Promise.resolve(docs) });
                    }, 300);
                });
            }
            // Eliminar documento
            if (url === 'URL_DEL_BACKEND_ELIMINAR') {
                return new Promise(resolve => {
                    setTimeout(() => {
                        try {
                            const body = JSON.parse(options.body);
                            window.DOCUMENTOS_TRABAJADOR = window.DOCUMENTOS_TRABAJADOR.filter(d => d.nombre !== body.nombre);
                        } catch {}
                        resolve({ json: () => Promise.resolve({ ok: true }) });
                    }, 200);
                });
            }
            // Buscar trabajadores
            if (url === 'URL_DEL_BACKEND_BUSQUEDA_TRABAJADOR') {
                return new Promise(resolve => {
                    setTimeout(() => {
                        // Simula búsqueda simple por nombre, rut o cargo
                        const body = JSON.parse(options.body);
                        // Puedes modificar este array para simular más trabajadores
                        const trabajadores = [
                            { nombre: "Juan Pérez", rut: "12345678-9", cargo: "Analista" },
                            { nombre: "María López", rut: "98765432-1", cargo: "Jefe" }
                        ];
                        const resultados = trabajadores.filter(t =>
                            (!body.nombre || t.nombre.toLowerCase().includes(body.nombre.toLowerCase())) &&
                            (!body.rut || t.rut.replace(/[^0-9kK]/g, '').includes(body.rut.replace(/[^0-9kK]/g, ''))) &&
                            (!body.cargo || t.cargo.toLowerCase().includes(body.cargo.toLowerCase()))
                        );
                        resolve({ json: () => Promise.resolve(resultados) });
                    }, 300);
                });
            }
            // Guardar datos del trabajador (simulado)
            if (url === 'URL_DEL_BACKEND') {
                return Promise.resolve({
                    json: () => Promise.resolve({ ok: true })
                });
            }
            // Lista de países (nacionalidades)
            if (url === 'URL_DEL_BACKEND_PAISES') {
                return Promise.resolve({
                    json: () => Promise.resolve(paises.slice())
                });
            }
            // Lista de regiones
            if (url === 'URL_DEL_BACKEND_REGIONES') {
                return Promise.resolve({
                    json: () => Promise.resolve(regiones.slice())
                });
            }
            // Lista de comunas
            if (url === 'URL_DEL_BACKEND_COMUNAS') {
                return Promise.resolve({
                    json: () => Promise.resolve(comunas.slice())
                });
            }
            // Lista de AFPs
            if (url === 'URL_DEL_BACKEND_AFPS') {
                return Promise.resolve({
                    json: () => Promise.resolve(afps.slice())
                });
            }
            // Lista de instituciones de salud
            if (url === 'URL_DEL_BACKEND_SALUD') {
                return Promise.resolve({
                    json: () => Promise.resolve(nombreSalud.slice())
                });
            }
            // Lista de jefes
            if (url === 'URL_DEL_BACKEND_JEFES') {
                return Promise.resolve({
                    json: () => Promise.resolve(nombreJefes.slice())
                });
            }
            // Lista de cargos (ejemplo, puedes modificar según tu app)
            if (url === 'URL_DEL_BACKEND_CARGOS') {
                const cargos = [
                    "Analista", "Jefe", "Gerente", "Asistente", "Contador", "Supervisor"
                ];
                return Promise.resolve({
                    json: () => Promise.resolve(cargos)
                });
            }

            // Por defecto, usa el fetch original
            return origFetch.apply(this, arguments);
        };
    })(window.fetch);
})();

// ==================== FIN BACKEND DE PRUEBA (ELIMINAR AL CONECTAR BACKEND REAL) ====================
