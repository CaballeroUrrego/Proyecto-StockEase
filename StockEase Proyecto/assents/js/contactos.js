// 🔹 Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    const tablaContactos = document.getElementById("tablaContactos"); // 📌 Tabla de contactos
    const buscarContacto = document.getElementById("buscarContacto"); // 📌 Input de búsqueda
    const btnAgregarProveedor = document.getElementById("btnAgregarProveedor"); // 📌 Botón "Agregar Proveedor"

    // 📌 Cargar proveedores almacenados al iniciar la página
    mostrarProveedores();

    // 📌 Evento para buscar contactos dinámicamente
    buscarContacto.addEventListener("input", filtrarProveedores);

    // 📌 Evento para agregar un nuevo proveedor
    btnAgregarProveedor.addEventListener("click", function () {
        agregarProveedor();
    });
});

// 📌 Función para obtener los proveedores desde LocalStorage
function obtenerProveedores() {
    return JSON.parse(localStorage.getItem("proveedores")) || []; // Si no hay proveedores, devuelve un array vacío
}

// 📌 Función para guardar los proveedores en LocalStorage
function guardarProveedores(proveedores) {
    localStorage.setItem("proveedores", JSON.stringify(proveedores));
}

// 📌 Función para mostrar los proveedores en la tabla
function mostrarProveedores(proveedoresFiltrados = null) {
    const tablaContactos = document.getElementById("tablaContactos");
    const proveedores = proveedoresFiltrados || obtenerProveedores();

    // 🔹 Limpiar la tabla antes de agregar nuevas filas
    tablaContactos.innerHTML = "";

    // 🔹 Recorrer los proveedores y agregarlos a la tabla
    proveedores.forEach((proveedor, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${proveedor.nombre}</td>
            <td>${proveedor.correo}</td>
            <td>${proveedor.telefono}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProveedor(${index})">
                    <i class="fas fa-edit"></i> 
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProveedor(${index})">
                    <i class="fas fa-trash"></i> 
                </button>
            </td>
        `;
        tablaContactos.appendChild(fila);
    });
}

// 📌 Función para agregar un nuevo proveedor
function agregarProveedor() {
    // 🔹 Pedir datos al usuario
    const nombre = prompt("Ingrese el nombre del proveedor:");
    if (!nombre) return; // Si cancela, no hace nada

    const correo = prompt("Ingrese el correo del proveedor:");
    if (!correo) return;

    const telefono = prompt("Ingrese el teléfono del proveedor:");
    if (!telefono) return;

    // 🔹 Crear objeto del proveedor
    const nuevoProveedor = { nombre, correo, telefono };

    // 🔹 Guardar en LocalStorage
    const proveedores = obtenerProveedores();
    proveedores.push(nuevoProveedor);
    guardarProveedores(proveedores);

    // 🔹 Actualizar la tabla
    mostrarProveedores();
}

// 📌 Función para editar un proveedor existente
function editarProveedor(index) {
    const proveedores = obtenerProveedores(); // Obtener lista actual de proveedores

    // 🔹 Obtener datos actuales
    const proveedorActual = proveedores[index];

    // 🔹 Pedir nuevos datos al usuario
    const nuevoNombre = prompt("Editar nombre del proveedor:", proveedorActual.nombre);
    if (!nuevoNombre) return; // Si cancela, no hace nada

    const nuevoCorreo = prompt("Editar correo del proveedor:", proveedorActual.correo);
    if (!nuevoCorreo) return;

    const nuevoTelefono = prompt("Editar teléfono del proveedor:", proveedorActual.telefono);
    if (!nuevoTelefono) return;

    // 🔹 Actualizar los datos del proveedor
    proveedores[index] = { nombre: nuevoNombre, correo: nuevoCorreo, telefono: nuevoTelefono };

    // 🔹 Guardar los cambios en LocalStorage
    guardarProveedores(proveedores);

    // 🔹 Actualizar la tabla con los datos editados
    mostrarProveedores();
}

// 📌 Función para eliminar un proveedor
function eliminarProveedor(index) {
    if (confirm("¿Seguro que quieres eliminar este proveedor?")) {
        const proveedores = obtenerProveedores();
        proveedores.splice(index, 1); // 🔹 Elimina el proveedor en la posición dada
        guardarProveedores(proveedores);
        mostrarProveedores();
    }
}

// 📌 Función para filtrar proveedores por nombre o correo
function filtrarProveedores() {
    const textoBusqueda = document.getElementById("buscarContacto").value.toLowerCase();
    const proveedores = obtenerProveedores();

    // 🔹 Filtrar por coincidencia en nombre o correo
    const proveedoresFiltrados = proveedores.filter(proveedor =>
        proveedor.nombre.toLowerCase().includes(textoBusqueda) ||
        proveedor.correo.toLowerCase().includes(textoBusqueda)
    );

    // 🔹 Mostrar solo los proveedores filtrados
    mostrarProveedores(proveedoresFiltrados);
}

