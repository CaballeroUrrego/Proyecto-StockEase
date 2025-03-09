// Este script maneja la lógica de redirección según el rol seleccionado en el formulario de registro y valida que todos los campos estén llenos.

// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  let selectedRole = '';

  // Añade un evento de clic a cada botón de rol para capturar el rol seleccionado
  document.querySelectorAll('button[name="role"]').forEach(button => {
    button.addEventListener('click', function () {
      // Elimina la clase seleccionada de todos los botones
      document.querySelectorAll('button[name="role"]').forEach(btn => {
        btn.classList.remove('btn-selected-admin', 'btn-selected-empleado', 'btn-selected-proveedor');
      });

      // Añade la clase seleccionada al botón clicado
      selectedRole = this.value;
      if (selectedRole === 'admin') {
        this.classList.add('btn-selected-admin');
      } else if (selectedRole === 'empleado') {
        this.classList.add('btn-selected-empleado');
      } else if (selectedRole === 'proveedor') {
        this.classList.add('btn-selected-proveedor');
      }
    });
  });

  // Añade un evento de envío al formulario para manejar la redirección
  document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previene el envío del formulario por defecto

    // Obtiene los valores de los campos del formulario
    const email = document.getElementById('email').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const documento = document.getElementById('documento').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Verifica que todos los campos estén llenos
    if (!email || !nombre || !documento || !password || !confirmPassword) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Verifica que se haya seleccionado un rol
    if (!selectedRole) {
      alert('Por favor, selecciona un rol.');
      return;
    }

    // Almacena el nombre en localStorage
    localStorage.setItem('nombreUsuario', nombre);

    // Redirige al usuario a la página correspondiente según el rol seleccionado
    if (selectedRole === 'admin') {
      window.location.href = '/html/prueba-Admin.html';
    } else if (selectedRole === 'empleado') {
      window.location.href = '/html/empleado.html';
    } else if (selectedRole === 'proveedor') {
      window.location.href = '/html/proveedor.html';
    }
  });
});