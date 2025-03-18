document.addEventListener("DOMContentLoaded", function () {
    const btnRegistrar = document.getElementById("btnRegistrar");
    const btnActualizar = document.getElementById("btnActualizar");
    const tablaVentas = document.getElementById("tablaVentas");

    // Función para cargar ventas en la tabla
    function cargarVentas() {
        tablaVentas.innerHTML = `
            <tr>
                <td>1</td>
                <td>2024-03-01</td>
                <td>Juan Pérez</td>
                <td>$250.00</td>
                <td>
                    <button class="btn btn-danger btn-sm btnEliminar"><i class="fas fa-trash"></i> Eliminar</button>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>2024-03-02</td>
                <td>María Gómez</td>
                <td>$120.00</td>
                <td>
                    <button class="btn btn-danger btn-sm btnEliminar"><i class="fas fa-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    }

    // Evento para registrar una nueva venta
    btnRegistrar.addEventListener("click", function () {
        alert("Funcionalidad de registrar venta en desarrollo...");
    });

    // Evento para actualizar la lista de ventas
    btnActualizar.addEventListener("click", function () {
        cargarVentas();
    });

    // Evento para eliminar una venta
    tablaVentas.addEventListener("click", function (event) {
        if (event.target.classList.contains("btnEliminar")) {
            event.target.closest("tr").remove();
        }
    });

    // Cargar ventas al inicio
    cargarVentas();
});
