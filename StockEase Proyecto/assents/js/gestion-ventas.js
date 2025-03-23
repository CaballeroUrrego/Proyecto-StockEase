// 🔹 Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    const tablaVentas = document.getElementById("tablaVentas"); // 📌 Tabla de ventas
    const buscarVenta = document.getElementById("buscarVenta"); // 📌 Input de búsqueda

    // 📌 Cargar ventas almacenadas al iniciar la página
    mostrarVentas();

    // 📌 Evento para buscar ventas dinámicamente
    buscarVenta.addEventListener("input", filtrarVentas);
});

// 📌 Función para obtener las ventas desde LocalStorage
function obtenerVentas() {
    return JSON.parse(localStorage.getItem("ventas")) || []; // Si no hay ventas, devuelve un array vacío
}

// 📌 Función para guardar las ventas en LocalStorage
function guardarVentas(ventas) {
    localStorage.setItem("ventas", JSON.stringify(ventas));
}

// 📌 Función para mostrar las ventas en la tabla
function mostrarVentas(ventasFiltradas = null) {
    const tablaVentas = document.getElementById("tablaVentas");
    const ventas = ventasFiltradas || obtenerVentas();

    // 🔹 Limpiar la tabla antes de agregar nuevas filas
    tablaVentas.innerHTML = "";

    // 🔹 Recorrer las ventas y agregarlas a la tabla
    ventas.forEach((venta, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${venta.empleado}</td>
            <td>${venta.producto}</td>
            <td>${venta.cantidad}</td>
            <td>${venta.total}</td>
            <td>${venta.fecha}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarVenta(${index})">
                    <i class="fas fa-edit"></i> 
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarVenta(${index})">
                    <i class="fas fa-trash"></i> 
                </button>
            </td>
        `;
        tablaVentas.appendChild(fila);
    });
}

// 📌 Función para buscar ventas por empleado, producto o fecha
function filtrarVentas() {
    const textoBusqueda = document.getElementById("buscarVenta").value.toLowerCase();
    const ventas = obtenerVentas();

    // 🔹 Filtrar por coincidencia en empleado, producto o fecha
    const ventasFiltradas = ventas.filter(venta =>
        venta.empleado.toLowerCase().includes(textoBusqueda) ||
        venta.producto.toLowerCase().includes(textoBusqueda) ||
        venta.fecha.includes(textoBusqueda)
    );

    // 🔹 Mostrar solo las ventas filtradas
    mostrarVentas(ventasFiltradas);
}

// 📌 Función para editar una venta existente
function editarVenta(index) {
    const ventas = obtenerVentas(); // Obtener lista actual de ventas

    // 🔹 Obtener datos actuales
    const ventaActual = ventas[index];

    // 🔹 Pedir nuevos datos al usuario
    const nuevoEmpleado = prompt("Editar nombre del empleado:", ventaActual.empleado);
    if (!nuevoEmpleado) return;

    const nuevoProducto = prompt("Editar nombre del producto:", ventaActual.producto);
    if (!nuevoProducto) return;

    const nuevaCantidad = prompt("Editar cantidad:", ventaActual.cantidad);
    if (!nuevaCantidad) return;

    const nuevoTotal = prompt("Editar total:", ventaActual.total);
    if (!nuevoTotal) return;

    const nuevaFecha = prompt("Editar fecha (YYYY-MM-DD):", ventaActual.fecha);
    if (!nuevaFecha) return;

    // 🔹 Actualizar los datos de la venta
    ventas[index] = {
        empleado: nuevoEmpleado,
        producto: nuevoProducto,
        cantidad: nuevaCantidad,
        total: nuevoTotal,
        fecha: nuevaFecha
    };

    // 🔹 Guardar los cambios en LocalStorage
    guardarVentas(ventas);

    // 🔹 Actualizar la tabla con los datos editados
    mostrarVentas();
}

// 📌 Función para eliminar una venta
function eliminarVenta(index) {
    if (confirm("¿Seguro que quieres eliminar esta venta?")) {
        const ventas = obtenerVentas();
        ventas.splice(index, 1); // 🔹 Elimina la venta en la posición dada
        guardarVentas(ventas);
        mostrarVentas();
    }
}
