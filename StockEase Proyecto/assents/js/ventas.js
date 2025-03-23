// 🔹 Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // 📌 Buscar el formulario de "Registrar Venta"
    const ventaForm = document.getElementById("ventaForm");

    // 📌 Buscar la tabla donde se mostrarán las ventas en "Mis Ventas Mensuales"
    const tablaVentas = document.getElementById("tablaVentas");
    
    // 📌 Buscar el campo de búsqueda de ventas
    const inputBuscar = document.getElementById("buscarProducto");

    // 📌 Si la página actual es "Mis Ventas Mensuales", mostrar las ventas guardadas
    if (tablaVentas) {
        mostrarVentas(); // Llama a la función que carga las ventas desde el almacenamiento
        inputBuscar.addEventListener("input", filtrarVentas); // Activa la búsqueda en tiempo real
    }

    // 📌 Si la página actual es "Registrar Venta", capturar la venta cuando se envíe el formulario
    if (ventaForm) {
        ventaForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita que la página se recargue al enviar el formulario

            // 🔹 Capturar los valores que el usuario ingresó en el formulario
            const producto = document.getElementById("producto").value.trim();
            const cantidad = document.getElementById("cantidad").value.trim();
            const precio = document.getElementById("precio").value.trim();
            const fechaVenta = document.getElementById("fechaVenta").value;

            // 🔹 Verificar que el usuario haya llenado todos los campos antes de continuar
            if (!producto || !cantidad || !precio || !fechaVenta) {
                alert("Por favor, completa todos los campos antes de registrar la venta.");
                return; // Detener la función si falta información
            }

            // 🔹 Calcular el total de la venta multiplicando cantidad por precio
            const total = (parseFloat(cantidad) * parseFloat(precio)).toFixed(2);

            // 🔹 Crear un objeto con la información de la venta
            const nuevaVenta = {
                id: generarIDVenta(), // Genera un número único para la venta
                fecha: fechaVenta,
                producto: producto,
                cantidad: cantidad,
                total: `$${total}` // Formato en dólares
            };

            // 🔹 Guardar la venta en el almacenamiento local del navegador
            guardarVenta(nuevaVenta);

            // 🔹 Limpiar el formulario para permitir registrar una nueva venta
            ventaForm.reset();

            // 🔹 Mostrar una notificación al usuario de que la venta fue registrada
            alert("Venta registrada correctamente.");
        });
    }
});

// 📌 Función que genera un ID único para cada venta nueva
function generarIDVenta() {
    const ventas = obtenerVentas(); // Obtener la lista de ventas guardadas
    return ventas.length + 1; // El ID será el número total de ventas +1
}

// 📌 Función para obtener las ventas guardadas en el almacenamiento local
function obtenerVentas() {
    return JSON.parse(localStorage.getItem("ventas")) || []; // Si no hay ventas, devuelve un array vacío
}

// 📌 Función para guardar una venta en el almacenamiento local
function guardarVenta(venta) {
    const ventas = obtenerVentas(); // Obtener las ventas actuales
    ventas.push(venta); // Agregar la nueva venta a la lista
    localStorage.setItem("ventas", JSON.stringify(ventas)); // Guardar la lista actualizada
}

// 📌 Función para mostrar todas las ventas en la tabla de "Mis Ventas Mensuales"
function mostrarVentas(ventasFiltradas = null) {
    const ventas = ventasFiltradas || obtenerVentas(); // Usar ventas filtradas si existen, de lo contrario cargar todas
    const tablaVentas = document.getElementById("tablaVentas");

    // 🔹 Limpiar la tabla antes de agregar nuevas ventas
    tablaVentas.innerHTML = "";

    // 🔹 Recorrer la lista de ventas y agregar cada una a la tabla
    ventas.forEach((venta) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${venta.id}</td>
            <td>${venta.fecha}</td>
            <td>${venta.producto}</td>
            <td>${venta.total}</td>
        `;
        tablaVentas.appendChild(fila); // Insertar la fila en la tabla
    });
}

// 📌 Función para buscar ventas por nombre, ID, total o fecha
function filtrarVentas() {
    const textoBusqueda = document.getElementById("buscarProducto").value.toLowerCase(); // Convertir a minúsculas para evitar errores
    const ventas = obtenerVentas(); // Obtener todas las ventas guardadas

    // 🔹 Buscar coincidencias en nombre, ID, total o fecha de la venta
    const ventasFiltradas = ventas.filter(venta =>
        venta.producto.toLowerCase().includes(textoBusqueda) || // Coincidencia en el nombre del producto
        venta.id.toString().includes(textoBusqueda) || // Coincidencia en el número de ID
        venta.total.includes(textoBusqueda) || // Coincidencia en el total de la venta
        venta.fecha.includes(textoBusqueda) // Coincidencia en la fecha de la venta
    );

    // 🔹 Mostrar solo las ventas que coinciden con la búsqueda
    mostrarVentas(ventasFiltradas);
}

// 📌 Detectar clic en el botón "Registrar Venta" y redirigir a la página de registro
document.getElementById("btnRegistrar").addEventListener("click", function () {
    window.location.href = "/html/registrar-venta.html"; // Cambiar a la página de registro de ventas
});
