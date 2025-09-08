# 📄 Integración Backend - Frontend ContaPlus

Este documento guía al equipo backend para trabajar eficientemente con el frontend de ContaPlus. Incluye cómo ubicar los puntos críticos donde intervenir en **cualquier vista** (`view_*.js`) y detalla específicamente cómo trabajar con la vista `view_datos_empresa.js`.

---

## 🧭 1. Ubicar puntos donde intervenir en el frontend

### ✅ Buscar con Ctrl + F: `"// ACA:"`

Todas las vistas del frontend (`view_*.js`) tienen marcados los lugares donde el backend debe intervenir utilizando `// ACA:`.

### Ejemplos de `// ACA:`:

- `// ACA: evento para que el backend busque este archivo por nombre`
- `// ACA: enviar datos y archivos al backend`
- `// ACA: manejar respuesta del backend`
- `// ACA: agregar archivos históricos al FormData`

Usar **Ctrl + F** o **Ctrl + Shift + F (global)** permite encontrar todos los `// ACA:` en el proyecto rápidamente.

---

## 🧩 2. View Datos Empresa

Esta vista corresponde al formulario de ingreso y edición de datos de una empresa, incluyendo:
- Datos básicos de la empresa
- Actividades económicas
- Socios y métodos de pago
- Usuarios autorizados
- Archivos históricos

---

### ▶️ Carga de datos desde el backend (`GET /api/empresa/:id`)

#### Función usada en frontend:

```js
cargarDatosEmpresa(data);
```

#### Se llama así:

```js
fetch('/api/empresa/123')
  .then(res => res.json())
  .then(data => cargarDatosEmpresa(data));
```

---

### 📦 JSON esperado desde backend:

```json
{
  "razonSocial": "EMPRESA CHILE SPA",
  "nombreFantasia": "TiendaTech",
  "rut": "76.123.456-7",
  "tipoSociedad": "SpA",
  "capitalTotal": 5000000,
  "cantidadAcciones": 100,
  "fechaConstitucion": "2021-04-12",
  "fechaInicio": "2021-04-20",

  "region": "Región Metropolitana",
  "comuna": "Santiago",
  "tipoPropiedad": "Arriendo",
  "regimenTributario": "14D",
  "mutual": "IST",
  "gratificacionLegal": "Sí",

  "actividadesEconomicas": ["Comercio", "Electrónica"],
  "fechaPagoGlobal": "2025-06-01",

  "archivosHistoricos": ["estatutos.pdf", "resumen_tributario.xlsx"],

  "socios": [
    {
      "nombre": "Ana Ruiz",
      "rut": "13.123.456-9",
      "participacion": 60,
      "acciones": 60,
      "fechaIncorporacion": "2021-04-12",
      "pagos": [
        { "tipo": "Transferencia", "acciones": 40, "capitalPagado": 2000000 },
        { "tipo": "Efectivo", "acciones": 20, "capitalPagado": 1000000 }
      ]
    }
  ],

  "usuariosAutorizados": [
    {
      "nombre": "Laura Díaz",
      "rut": "12.345.678-9",
      "cargo": "Representante Legal",
      "correo": "laura@empresa.cl",
      "telefono": "+56912345678"
    }
  ]
}
```

---

### 🧾 Recepción de datos por parte del backend (`POST /api/empresa/guardar`)

El formulario se envía con `FormData`, que contiene:

- Campos básicos de la empresa
- Socios (`socio[]`) y sus métodos de pago
- Usuarios autorizados (`usuario[]`)
- Archivos (`archivosHistoricos[]`)

#### Fragmento JS que lo envía:

```js
fetch('/api/empresa/guardar', {
  method: 'POST',
  body: formData
});
```

- Tipo: `multipart/form-data`
- Los arrays se envían con `name="campo[]"`

---

### 📂 Archivos recibidos

Los archivos históricos cargados manualmente en el frontend se envían como `File` dentro del mismo FormData.  
Los que vienen desde el backend solo se muestran (nombre) y se pueden solicitar con:

```
GET /api/datos-historicos/descargar/:nombre
```

---


## 🧩 3. View Datos Trabajador
```py
class DatosGenerales(BaseModel):
    nombre_completo: str
    rut: str
    fecha_nacimiento: date
    sexo: str
    nacionalidad: str
    estado_civil: str
    foto_url: str

# Información de contacto
class InfoContacto(BaseModel):
    telefono_personal: str
    telefono_corporativo: Optional[str] = None
    correo_personal: EmailStr
    correo_corporativo: Optional[EmailStr] = None

# Información de vivienda
class InfoVivienda(BaseModel):
    direccion: str
    region: str
    comuna: str
    provincia: str

# Información de seguros
class InfoSeguros(BaseModel):
    afp: str
    instituto_salud: str
    plan_uf: float

# Información laboral
class InfoLaboral(BaseModel):
    cargo: str
    jefe_directo: str
    sueldo_base: float
    fecha_ingreso: date
    fecha_contrato: date
    forma_pago: str

# Modelo completo del trabajador para la creación
class TrabajadorCreate(BaseModel):
    datos_generales: DatosGenerales
    info_contacto: InfoContacto
    info_vivienda: InfoVivienda
    info_seguros: InfoSeguros
    info_laboral: InfoLaboral

# Modelo completo del trabajador para la lectura (incluye un ID)
class Trabajador(TrabajadorCreate):
    id: int
```



