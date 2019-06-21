"use strict";
var lista = new Array();
$(function () {
    $("#btnAgregar").click(agregar);
    $("#btnMostrar").click(mostrar);
});
function agregar() {
    var mascota;
    var nombre = String($("#inputNombre").val());
    switch ($('#selectTipo').val()) {
        case "Perro":
            console.log("Es un perro");
            mascota = new animal.Perro(nombre);
            lista.push(mascota);
            break;
        case "Gato":
            console.log("Es un gato");
            mascota = new animal.Gato(nombre);
            lista.push(mascota);
            break;
    }
}
function mostrar() {
    console.log(lista);
}
function eliminar() {
}
function modificar() {
}
