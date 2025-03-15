document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const tablaPedidos = document.getElementById("tablaPedidos");

    searchBar.addEventListener("keyup", function () {
        let filter = searchBar.value.toLowerCase();
        let filas = tablaPedidos.getElementsByTagName("tr");

        for (let i = 0; i < filas.length; i++) {
            let celdas = filas[i].getElementsByTagName("td");
            let match = false;

            for (let j = 0; j < celdas.length; j++) {
                if (celdas[j]) {
                    let texto = celdas[j].textContent || celdas[j].innerText;
                    if (texto.toLowerCase().includes(filter)) {
                        match = true;
                        break;
                    }
                }
            }
            filas[i].style.display = match ? "" : "none";
        }
    });
});
