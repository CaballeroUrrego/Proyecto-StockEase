document.addEventListener("DOMContentLoaded", function () {
    const formRegistro = document.getElementById("productoForm");

    formRegistro.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombreProducto").value.trim();
        const categoria = document.getElementById("categoriaProducto").value.trim();
        const stock = parseInt(document.getElementById("stockProducto").value);
        const precio = parseFloat(document.getElementById("precioProducto").value);
        const fechaEntrada = document.getElementById("fechaEntrada").value;

        if (nombre === "" || categoria === "" || isNaN(stock) || isNaN(precio) || fechaEntrada === "") {
            alert("⚠️ Complete todos los campos correctamente.");
            return;
        }

        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.push({ nombre, categoria, stock, precio, fechaEntrada });
        localStorage.setItem("productos", JSON.stringify(productos));

        alert("✅ Producto registrado con éxito.");

        formRegistro.reset();
    });
});
