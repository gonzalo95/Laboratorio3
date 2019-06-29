"use strict";
var vehiculos = new Array();
$(function () {
    $("#btnAgregar").click(agregar);
    $("#btnPromedio").click(promediar);
    $("#selectFiltro").change(filtrar);
    $("#btnLimpiar").click(limpiar);
    if (localStorage.getItem("vehiculos")) {
        vehiculos = JSON.parse(localStorage.getItem("vehiculos"));
    }
    mostrarLista();
});
function filtrar() {
    var tipo = String($("#selectFiltro").val());
    switch (tipo) {
        case "Auto":
            vehiculos = vehiculos.filter(function (vehiculo) { return vehiculo instanceof Entidades.Auto; });
            break;
        case "Camioneta":
            vehiculos = vehiculos.filter(function (vehiculo) { return vehiculo instanceof Entidades.Camioneta; });
            break;
    }
    mostrarLista();
}
function limpiar() {
    localStorage.clear();
    vehiculos = new Array();
    mostrarLista();
}
function getId() {
    if (vehiculos.length === 0)
        return 1;
    var ultimo = vehiculos.reduce(function (prev, act) { return (prev.id > act.id) ? prev : act; });
    return ultimo.id + 1;
}
function agregar() {
    var id = getId();
    var marca = String($("#inputMarca").val());
    var modelo = String($("#inputModelo").val());
    var precio = Number($("#inputPrecio").val());
    var tipo = String($("#selectAlta").val());
    console.log("AGREGANDO...");
    console.log(tipo);
    console.log(precio);
    switch (tipo) {
        case "Auto":
            vehiculos.push(new Entidades.Auto(id, marca, modelo, precio));
            localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
            mostrarLista();
            console.log(vehiculos);
            break;
        case "Camioneta":
            vehiculos.push(new Entidades.Camioneta(id, marca, modelo, precio));
            localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
            mostrarLista();
            console.log(vehiculos);
            break;
        default:
            break;
    }
}
function promediar() {
    var promedio = vehiculos.reduce(function (sum, vehiculo) { return sum + vehiculo.precio; }, 0) / vehiculos.length;
    $("#inputPromedio").val(promedio);
}
function mostrarLista() {
    var tipo = String($("#selectFiltro").val());
    $("#tBody").empty();
    for (var i = 0; i < vehiculos.length; i++) {
        var vehiculo = vehiculos[i];
        var tr = document.createElement("tr");
        var tdId = document.createElement("td");
        var id = document.createTextNode(String(vehiculo.id));
        tdId.appendChild(id);
        //tdId.setAttribute("hidden", "true");
        tr.appendChild(tdId);
        var tdMarca = document.createElement("td");
        var marca = document.createTextNode(vehiculo.marca);
        tdMarca.appendChild(marca);
        tr.appendChild(tdMarca);
        var tdModelo = document.createElement("td");
        var modelo = document.createTextNode(vehiculo.modelo);
        tdModelo.appendChild(modelo);
        tr.appendChild(tdModelo);
        var tdPrecio = document.createElement("td");
        console.log(vehiculo.precio);
        var precio = document.createTextNode(String(vehiculo.precio));
        tdPrecio.appendChild(precio);
        tr.appendChild(tdPrecio);
        var btnEliminar = document.createElement("button");
        btnEliminar.addEventListener("click", eliminar);
        btnEliminar.innerHTML = "Borrar";
        tr.appendChild(btnEliminar);
        $("#tBody").append(tr);
    }
}
function eliminar(e) {
    var trigger = e.target;
    var id = Number(trigger.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML);
    console.log(trigger);
    console.log(id);
    vehiculos = vehiculos.filter(function (vehiculo) { return vehiculo.id != id; });
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    mostrarLista();
}
