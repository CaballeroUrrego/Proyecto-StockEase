// 📌 Esperamos a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    const tablaInventario = document.getElementById("tablaInventario");
    const inputBuscar = document.getElementById("buscarProducto");

    // 📌 Evento de búsqueda en tiempo real
    inputBuscar.addEventListener("input", function () {
        let filtro = inputBuscar.value.toLowerCase().trim(); // Convertir búsqueda a minúsculas y eliminar espacios en blanco
        let filas = tablaInventario.getElementsByTagName("tr");
        let coincidencias = false; // Variable para saber si hubo coincidencias

        for (let i = 0; i < filas.length; i++) {
            let celdas = filas[i].getElementsByTagName("td");
            if (celdas.length > 0) {
                let nombreProducto = celdas[1].textContent.toLowerCase(); // Obtener el nombre del producto
                if (nombreProducto.includes(filtro)) {
                    filas[i].style.display = ""; // Mostrar la fila si coincide
                    coincidencias = true;
                } else {
                    filas[i].style.display = "none"; // Ocultar si no coincide
                }
            }
        }

        // 📌 Si no hay coincidencias, mostrar un mensaje en la tabla
        if (!coincidencias) {
            tablaInventario.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-danger">No se encontraron productos</td>
                </tr>
            `;
        }
    });
});
