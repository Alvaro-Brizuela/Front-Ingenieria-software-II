// Backend de prueba con Node.js y Express
const express = require('express');
const app = express();
const PORT = 3000;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Datos simulados
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
const regiones = [
    "XV Arica y Parinacota","I Tarapacá","II Antofagasta","III Atacama",
    "IV Coquimbo","V Valparaíso","VI Libertador General Bernardo O'Higgins","VII Maule","VIII Biobío",
    "IX la Araucanía","XIV los Ríos","X los Lagos","XI Aysén","XII Magallanes y Antártica Chilena","Metropolitana de Santiago"
]
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
const afps = [
    "AFP CUPRUM","AFP HABITAT","AFP PLANVITAL","AFP PROVIDA","AFP MODELO","AFP UNO","SIN AFP"
]
const nombreSalud = [
    "FONASA","BANMEDICA","COLMENA","CONSALUD","CRUZ BLANCA","NUEVA MASVIDA","VIDA TRES","ESENCIAL"
]
const nombreJefes = [
    "Jefe 1","Jefe 2","Jefe 3","Jefe 4","Jefe 5","Jefe 6","Jefe manuel"
]
const contratosTrabajador = [
    { nombre: "Contrato 2022.pdf", url: "archivos/contrato_2022.pdf" },
    { nombre: "Contrato 2023.pdf", url: "archivos/contrato_2023.pdf" }
];
const documentosTrabajador = [
    { nombre: "Certificado AFP.pdf", url: "archivos/certificado_afp.pdf" },
    { nombre: "Licencia médica.jpg", url: "archivos/licencia_medica.jpg" }
];

// Datos simulados de trabajadores
const trabajadores = [
    { nombre: "Juan", rut: "12345678-9", cargo: "Analista", sueldo: 800000 },
    { nombre: "María", rut: "98765432-1", cargo: "Desarrollador", sueldo: 950000 },
    { nombre: "Pedro", rut: "11222333-4", cargo: "Analista", sueldo: 820000 },
    { nombre: "Ana", rut: "55666777-8", cargo: "Jefe de Proyecto", sueldo: 1200000 }
];

// Endpoints
app.get('/paises', (req, res) => res.json(paises));
app.get('/regiones', (req, res) => res.json(regiones));
app.get('/comunas', (req, res) => res.json(comunas));
app.get('/afps', (req, res) => res.json(afps));
app.get('/instituciones-salud', (req, res) => res.json(nombreSalud));
app.get('/jefes', (req, res) => res.json(nombreJefes)); // corregido aquí
app.get('/contratos', (req, res) => res.json(contratosTrabajador));
app.get('/documentos', (req, res) => res.json(documentosTrabajador));

// Endpoint para búsqueda de trabajadores filtrados por nombre, rut y cargo
app.post('/buscar-trabajadores', express.json(), (req, res) => {
    const { nombre, rut, cargo } = req.body;
    const resultado = trabajadores.filter(t => {
        const matchNombre = !nombre || t.nombre.toLowerCase().includes(nombre.toLowerCase());
        const matchRut = !rut || t.rut.includes(rut);
        const matchCargo = !cargo || t.cargo.toLowerCase().includes(cargo.toLowerCase());
        return matchNombre && matchRut && matchCargo;
    });
    res.json(resultado);
});

// Endpoint para recibir datos de un nuevo trabajador (simulado)
app.post('/trabajadores', (req, res) => {
    // Si recibes FormData, necesitas multer o express-fileupload para archivos reales.
    // Aquí solo simulamos la respuesta.
    let data = {};
    if (req.is('multipart/form-data')) {
        // No procesamos archivos en este mock, solo respondemos ok.
        data = { ok: true, mensaje: "Recibido (mock)" };
    } else {
        data = req.body;
    }
    res.json(data);
});

// Endpoints simulados para documentos
app.post('/documentos/subir', (req, res) => {
    // Simula subida y retorna [{nombre, url}, ...]
    // En un caso real, deberías manejar archivos con multer.
    res.json([
        { nombre: "DocumentoSubido.pdf", url: "archivos/DocumentoSubido.pdf" }
    ]);
});
app.post('/documentos/eliminar', express.json(), (req, res) => {
    // Simula eliminación
    res.json({ ok: true });
});
app.get('/documentos/listar', (req, res) => {
    // Retorna la lista simulada
    res.json(documentosTrabajador);
});

app.listen(PORT, () => {
    console.log(`Servidor backend de prueba escuchando en http://localhost:${PORT}`);
});
