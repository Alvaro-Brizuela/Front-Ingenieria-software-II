/* FUNCIONES VIEW */

// Elementos
const btnLoginTab = document.getElementById('btnLoginTab');
const btnRegisterTab = document.getElementById('btnRegisterTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formWrapper = document.querySelector('.form-wrapper');

// URL de tu backend FastAPI
const API_URL = "http://localhost:8000/auth";

// Ajusta la altura del contenedor al formulario activo
function adjustFormHeight() {
  const activeForm = document.querySelector('.form-section.active');
  if (activeForm) {
    formWrapper.style.height = `${activeForm.scrollHeight}px`;
  }
}

// Función para cambiar entre formularios con transición
function switchForm(showForm, hideForm, activeBtn, inactiveBtn) {
  activeBtn.classList.add('active');
  inactiveBtn.classList.remove('active');

  hideForm.classList.remove('active');
  hideForm.classList.add('exiting');

  setTimeout(() => {
    hideForm.classList.remove('exiting');
    showForm.classList.add('active');
    adjustFormHeight();
  }, 250);
}

// Eventos de pestañas
btnLoginTab.addEventListener('click', () => {
  switchForm(loginForm, registerForm, btnLoginTab, btnRegisterTab);
});

btnRegisterTab.addEventListener('click', () => {
  switchForm(registerForm, loginForm, btnRegisterTab, btnLoginTab);
});

// ---------------------------
// LOGIN FORM → conecta al backend
// ---------------------------
loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // OBTENER inputs (primer input tipo email y password dentro del form)
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  try {
    const res = await fetch(`${API_URL}/login_api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.detail || "Error al iniciar sesión");
      return;
    }

    const data = await res.json();
    console.log("Login correcto:", data);

    // Guardar tokens y datos mínimos
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("usuario_id", data.usuario_id);
    localStorage.setItem("empresa_id", data.empresa_id);
    localStorage.setItem("rol", data.rol);

    // Redirigir a dashboard
    window.location.href = "/dashboard.html";
  } catch (err) {
    console.error("Error de conexión:", err);
    alert("No se pudo conectar con el servidor");
  }
});

// ---------------------------
// REGISTER FORM → conecta al backend
// ---------------------------
registerForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('nombresRegister').value;
  const paternal_surname = document.getElementById('ApellidoPaternoRegister').value;
  const maternal_surname = document.getElementById('ApellidoMaternoRegister').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = document.getElementById('passwordRegister').value;
  const confirm_password = document.getElementById('confirmPassword').value;

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        paternal_surname,
        maternal_surname,
        email,
        password,
        confirm_password
      })
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.detail || "Error al registrar usuario");
      return;
    }

    const data = await res.json();
    console.log("Registro correcto:", data);

    alert("Cuenta creada correctamente. Ahora inicia sesión.");
    // Cambiar a formulario de login
    switchForm(loginForm, registerForm, btnLoginTab, btnRegisterTab);
  } catch (err) {
    console.error("Error de conexión:", err);
    alert("No se pudo conectar con el servidor");
  }
});

// ---------------------------
window.addEventListener('DOMContentLoaded', adjustFormHeight);
