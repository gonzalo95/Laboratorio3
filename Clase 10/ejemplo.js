"use strict";
// function saludar(mi:animal.Animal){
//     console.log(mi.hacerRuido());
// }
// let lista:Array<animal.Animal> = new Array<animal.Animal>();
// lista.push(new animal.Perro("pepe"));
// lista.push(new animal.Gato());
// lista.forEach(saludar);
// function otraCosa(){
//     console.log("Hace algo");
// }
//import $ = require("jquery");
var lista = new Array();
$(function () {
    $("#btnSubmit").click(agregarAnimal);
    $("#btnMostrar").click(mostrarAnimales);
});
function agregarAnimal() {
    var nombre = String($("#inputNombre").val());
    console.log(nombre);
    // $("#selectTipo").children("option:selected").val()
    switch ($('#selectTipo :selected').text()) {
        case "Perro":
            console.log("Es un perro");
            break;
        case "Gato":
            console.log("Es un perro");
            break;
    }
    lista.push(new animal.Perro(nombre));
}
function mostrarAnimales() {
    console.log(lista);
}
function eliminarAnimal() {
}
function modificarAnimal() {
}
