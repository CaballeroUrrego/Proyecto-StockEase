// Selecciona los elementos del DOM
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const nombreUsuario = document.getElementById('nombreUsuario');

// Añade un evento de clic al botón del menú hamburguesa
toggleSidebar.addEventListener('click', () => {
  // Alterna la clase 'show' en el sidebar para mostrar/ocultar
  sidebar.classList.toggle('show');
  // Alterna la clase 'shift' en el contenido principal para ajustar el margen
  content.classList.toggle('shift');
});

// Recupera el nombre del usuario desde localStorage y lo muestra en el navbar
document.addEventListener('DOMContentLoaded', () => {
  const nombre = localStorage.getItem('nombreUsuario');
  if (nombre) {
    nombreUsuario.textContent = nombre;
  }
});