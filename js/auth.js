// js/auth.js

// --- MANEJO DEL FORMULARIO DE LOGIN ---
const loginForm = document.getElementById('login-form');
const loginErrorMessage = document.getElementById('login-error-message');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Login form submit event triggered."); // DEBUG #1

        hideLoginError();

        const emailInput = document.getElementById('login-email');
        if (!emailInput) {
            console.error("ERROR FATAL: No se encontró el campo de email con ID 'login-email'. Verifica tu HTML.");
            showLoginError("Error interno. El campo de email no se encontró.");
            return;
        }
        const email = emailInput.value.trim().toLowerCase();

        const passwordInput = document.getElementById('login-password');
        if (!passwordInput) {
            console.error("ERROR FATAL: No se encontró el campo de contraseña con ID 'login-password'. Verifica tu HTML.");
            showLoginError("Error interno. El campo de contraseña no se encontró.");
            return;
        }
        const password = passwordInput.value.trim(); // AÑADIDO .trim() AQUÍ

        console.log("Intentando iniciar sesión con:"); // DEBUG #2
        console.log("Email ingresado (después de trim y toLowerCase):", `"${email}"`); // DEBUG #2
        console.log("Contraseña ingresada (después de trim):", `"${password}"`); // DEBUG #2

        if (!email || !password) {
            console.log("Fallo Validación: Email o contraseña vacíos."); // DEBUG
            showLoginError("Por favor, completa todos los campos.");
            return;
        }

        const usersJSON = localStorage.getItem('gearUpGalaxyUsers');
        console.log("Contenido de 'gearUpGalaxyUsers' en localStorage (JSON string):", usersJSON); // DEBUG #3

        const users = JSON.parse(usersJSON) || [];
        console.log("Array de usuarios parseado:", users); // DEBUG #3

        if (!users || users.length === 0) {
            console.log("Fallo: No hay usuarios registrados en localStorage o el array está vacío."); //DEBUG
            showLoginError("No hay usuarios registrados o error al leerlos.");
            return;
        }

        const foundUser = users.find(user => user.email === email); // Asume que el email en localStorage ya está en minúsculas
        console.log("Resultado de users.find (foundUser):", foundUser); // DEBUG #4

        if (!foundUser) {
            console.log("Fallo: Email no registrado en el sistema."); // DEBUG
            showLoginError("El correo electrónico no está registrado.");
            return;
        }

        console.log("Comparando contraseñas..."); // DEBUG #5
        console.log("Contraseña ingresada para comparar:", `"${password}"`, "(Largo:", password.length + ")"); // DEBUG #5
        console.log("Contraseña almacenada para comparar:", `"${foundUser.password}"`, "(Largo:", foundUser.password.length + ")"); // DEBUG #5

        if (foundUser.password === password) {
            console.log("¡Contraseñas coinciden! Login exitoso."); // DEBUG #6
            localStorage.setItem('loggedInUser', JSON.stringify({ email: foundUser.email, name: foundUser.name }));
            alert(`¡Bienvenido de nuevo, ${foundUser.name || foundUser.email}! Has iniciado sesión correctamente.`);
            
            let redirectPath = '../index.html'; // Asumiendo que login.html está en /pages/
            if (!window.location.pathname.includes('/pages/')) {
                redirectPath = 'index.html';
            }
            console.log("Redirigiendo a:", redirectPath); // DEBUG
            window.location.href = redirectPath;
        } else {
            console.log("Fallo: Las contraseñas NO coinciden."); // DEBUG
            showLoginError("Contraseña incorrecta.");
        }
    });
}

function showLoginError(message) {
    if (loginErrorMessage) {
        loginErrorMessage.textContent = message;
        loginErrorMessage.style.display = 'block';
    }
}

function hideLoginError() {
    if (loginErrorMessage) {
        loginErrorMessage.style.display = 'none';
    }
}

// --- MANEJO DEL FORMULARIO DE REGISTRO (NORMAL - donde el usuario ingresa todos los datos) ---
const normalRegisterForm = document.getElementById('register-form'); 
if (normalRegisterForm) {
    const normalRegisterMessageElement = document.getElementById('register-message'); 

    normalRegisterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        hideRegisterMessageFeedback(normalRegisterMessageElement);

        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim().toLowerCase(); // Guardar email en minúsculas
        const password = document.getElementById('register-password').value; // No hacer trim a la contraseña al guardarla, a menos que también se haga en el login
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (!name || !email || !password || !confirmPassword) {
            showRegisterMessageFeedback("Por favor, completa todos los campos.", "danger", normalRegisterMessageElement); return; }
        if (password.length < 6) {
            showRegisterMessageFeedback("La contraseña debe tener al menos 6 caracteres.", "danger", normalRegisterMessageElement); return; }
        if (password !== confirmPassword) {
            showRegisterMessageFeedback("Las contraseñas no coinciden.", "danger", normalRegisterMessageElement); return; }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showRegisterMessageFeedback("Por favor, ingresa un correo electrónico válido.", "danger", normalRegisterMessageElement); return; }
        
        let users = JSON.parse(localStorage.getItem('gearUpGalaxyUsers')) || [];
        if (users.find(user => user.email === email)) { // Compara con email ya en minúsculas
            showRegisterMessageFeedback("Este correo electrónico ya está registrado. <a href='login.html'>¿Quieres iniciar sesión?</a>", "warning", normalRegisterMessageElement); return; }
        
        const newUser = { name: name, email: email, password: password }; // Password se guarda tal cual se ingresó
        users.push(newUser);
        localStorage.setItem('gearUpGalaxyUsers', JSON.stringify(users));
        showRegisterMessageFeedback(`¡Cuenta creada exitosamente para ${name}! Ahora puedes <a href="login.html">iniciar sesión</a>.`, "success", normalRegisterMessageElement);
        normalRegisterForm.reset();
    });
}

// --- MANEJO DEL FORMULARIO DE REGISTRO SIMULADO (credenciales pre-establecidas) ---
const simulatedRegisterForm = document.getElementById('register-form-simulated');
if (simulatedRegisterForm) {
    const simulatedRegisterMessageElement = document.getElementById('register-message'); 
    const generatedCredentialsDiv = document.getElementById('generated-credentials');
    const generatedEmailEl = document.getElementById('generated-email');
    const generatedPasswordEl = document.getElementById('generated-password');

    simulatedRegisterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        hideRegisterMessageFeedback(simulatedRegisterMessageElement);
        if(generatedCredentialsDiv) generatedCredentialsDiv.style.display = 'none';

        const name = document.getElementById('sim-register-name').value.trim();
        if (!name) {
            showRegisterMessageFeedback("Por favor, ingresa tu nombre.", "danger", simulatedRegisterMessageElement); return; }
        
        const normalizedName = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
        const randomSuffix = Math.floor(100 + Math.random() * 900);
        const generatedEmail = `${normalizedName || 'user'}${randomSuffix}@galaxy-sim.com`; // Ya está en minúsculas
        const generatedPassword = "SimPassWORD123!";
        
        let users = JSON.parse(localStorage.getItem('gearUpGalaxyUsers')) || [];
        if (users.find(user => user.email === generatedEmail)) {
            showRegisterMessageFeedback("Error al generar credenciales únicas, por favor intenta de nuevo.", "danger", simulatedRegisterMessageElement); return; }
        
        const newUser = { name: name, email: generatedEmail, password: generatedPassword };
        users.push(newUser);
        localStorage.setItem('gearUpGalaxyUsers', JSON.stringify(users));
        
        if (generatedEmailEl) generatedEmailEl.textContent = generatedEmail;
        if (generatedPasswordEl) generatedPasswordEl.textContent = generatedPassword;
        if (generatedCredentialsDiv) generatedCredentialsDiv.style.display = 'block';
        showRegisterMessageFeedback(`Credenciales generadas para ${name}. ¡Anótalas y <a href="login.html">ve a iniciar sesión</a>!`, "success", simulatedRegisterMessageElement);
        simulatedRegisterForm.reset();
    });
}

function showRegisterMessageFeedback(message, type = "danger", element) {
    if (element) {
        element.innerHTML = message;
        element.className = `alert alert-${type} mt-3`; // Añadí mt-3 para espaciado
        element.style.display = 'block';
    } else {
        console.warn("Elemento para mensajes de registro no encontrado en esta página.");
    }
}

function hideRegisterMessageFeedback(element) {
    if (element) {
        element.style.display = 'none';
    }
}

// --- MANEJO DEL FORMULARIO DE CAMBIO DE CONTRASEÑA ---
const changePasswordForm = document.getElementById('change-password-form');
const changePasswordMessage = document.getElementById('change-password-message');

if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        hideChangePasswordMessage();

        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            showChangePasswordMessage("Debes iniciar sesión para cambiar tu contraseña.", "danger");
            setTimeout(() => { 
                let loginPath = 'login.html'; // Asume que account.html está en /pages/
                if (!window.location.pathname.includes('/pages/')) { 
                    loginPath = 'pages/login.html';
                }
                window.location.href = loginPath; 
            }, 2000);
            return;
        }

        const currentPassword = document.getElementById('current-password').value.trim(); // Trim aquí también por consistencia
        const newPassword = document.getElementById('new-password').value.trim(); // Trim aquí
        const confirmNewPassword = document.getElementById('confirm-new-password').value.trim(); // Trim aquí

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            showChangePasswordMessage("Por favor, completa todos los campos.", "danger"); return; }
        if (newPassword.length < 6) {
            showChangePasswordMessage("La nueva contraseña debe tener al menos 6 caracteres.", "danger"); return; }
        if (newPassword !== confirmNewPassword) {
            showChangePasswordMessage("La nueva contraseña y la confirmación no coinciden.", "danger"); return; }
        if (newPassword === currentPassword) { // Compara después de trim
            showChangePasswordMessage("La nueva contraseña no puede ser igual a la actual.", "warning"); return; }

        let users = JSON.parse(localStorage.getItem('gearUpGalaxyUsers')) || [];
        const userIndex = users.findIndex(user => user.email === loggedInUser.email);

        if (userIndex === -1) {
            showChangePasswordMessage("Error: Usuario no encontrado. Intenta iniciar sesión de nuevo.", "danger");
            localStorage.removeItem('loggedInUser'); 
            updateUserNav(); return; }

        // Compara la contraseña actual ingresada (con trim) con la almacenada (que se guardó sin trim en el registro normal)
        if (users[userIndex].password !== currentPassword) { 
            showChangePasswordMessage("La contraseña actual es incorrecta.", "danger"); return; }

        users[userIndex].password = newPassword; // Guarda la nueva contraseña (con trim)
        localStorage.setItem('gearUpGalaxyUsers', JSON.stringify(users));
        showChangePasswordMessage("¡Contraseña cambiada exitosamente!", "success");
        changePasswordForm.reset();
    });
}

function showChangePasswordMessage(message, type = "danger") {
    if (changePasswordMessage) {
        changePasswordMessage.textContent = message;
        changePasswordMessage.className = `alert alert-${type} mt-3`; // Añadí mt-3
        changePasswordMessage.style.display = 'block';
    }
}

function hideChangePasswordMessage() {
    if (changePasswordMessage) {
        changePasswordMessage.style.display = 'none';
    }
}

// --- MANEJO DE UI DE NAVEGACIÓN Y CIERRE DE SESIÓN ---
function updateUserNav() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register'); // Asegúrate que este ID exista en tu HTML para el enlace de registro/obtener cuenta
    const navAccount = document.getElementById('nav-account');
    const navUsername = document.getElementById('nav-username');
    const logoutButton = document.getElementById('logout-button');

    if (loggedInUser) {
        if (navLogin) navLogin.style.display = 'none';
        if (navRegister) navRegister.style.display = 'none';
        if (navAccount) navAccount.style.display = 'block';
        if (navUsername) navUsername.textContent = loggedInUser.name || loggedInUser.email.split('@')[0];
    } else {
        if (navLogin) navLogin.style.display = 'list-item'; // O 'block' si es más apropiado para tu CSS
        if (navRegister) navRegister.style.display = 'list-item'; // O 'block'
        if (navAccount) navAccount.style.display = 'none';
    }

    if (logoutButton) {
        if (!logoutButton.hasAttribute('data-listener-attached')) {
            logoutButton.addEventListener('click', handleLogout);
            logoutButton.setAttribute('data-listener-attached', 'true');
        }
    }
}

function handleLogout(event) {
    if(event) event.preventDefault();
    localStorage.removeItem('loggedInUser');
    updateUserNav(); // Actualiza el nav inmediatamente

    if (window.location.pathname.includes('/pages/')) {
        window.location.href = '../index.html';
    } else {
         window.location.href = 'index.html';
    }
}