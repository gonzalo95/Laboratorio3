"use strict";
var lista = new Array();
var target;
$(function () {
    $("#btnAgregar").click(agregarEmpleado);
    $("#aMostrar").click(mostrarEmpleados);
});
function agregarEmpleado() {
    var nombre = String($("#inputNombre").val());
    var apellido = String($("#inputApellido").val());
    var edad = Number($("#inputEdad").val());
    var horario = String($("#inputHorario").val());
    var legajo = Number($("#inputLegajo").val());
    lista.push(new persona.Empleado(nombre, apellido, edad, horario, legajo));
    limpiarFormulario();
}
function limpiarFormulario() {
    $("#inputNombre").val("");
    $("#inputApellido").val("");
    $("#inputEdad").val("");
    $("#inputHorario").val("");
    $("#inputLegajo").val("");
}
function mostrarEmpleados() {
    console.log(lista);
    $("#tBody").empty();
    for (var i = 0; i < lista.length; i++) {
        var empleado = lista[i];
        var tr = document.createElement("tr");
        var tdNombre = document.createElement("td");
        var nombre = document.createTextNode(empleado.nombre);
        tdNombre.appendChild(nombre);
        tr.appendChild(tdNombre);
        var tdApellido = document.createElement("td");
        var apellido = document.createTextNode(empleado.apellido);
        tdApellido.appendChild(apellido);
        tr.appendChild(tdApellido);
        var tdEdad = document.createElement("td");
        var edad = document.createTextNode(String(empleado.edad));
        tdEdad.appendChild(edad);
        tr.appendChild(tdEdad);
        var tdLegajo = document.createElement("td");
        var legajo = document.createTextNode(String(empleado.legajo));
        tdLegajo.appendChild(legajo);
        tr.appendChild(tdLegajo);
        var tdTurno = document.createElement("td");
        var turno = document.createTextNode(empleado.horario);
        tdTurno.appendChild(turno);
        tr.appendChild(tdTurno);
        var btnModificar = document.createElement("button");
        btnModificar.addEventListener("click", cambiarForm);
        btnModificar.innerHTML = "Modificar";
        tr.appendChild(btnModificar);
        var btnEliminar = document.createElement("button");
        btnEliminar.addEventListener("click", wrapEliminar);
        btnEliminar.innerHTML = "Borrar";
        tr.appendChild(btnEliminar);
        $("#tBody").append(tr);
    }
}
function cambiarForm(e) {
    var trigger = e.target;
    target = trigger.previousSibling.previousSibling.innerHTML;
    ($("#inputNombre").val());
    ($("#inputApellido").val());
    ($("#inputEdad").val());
    ($("#inputHorario").val());
    ($("#inputLegajo").val());
    $("#btnAgregar").text("Modificar");
    $("#btnAgregar").unbind("click");
    $("#btnAgregar").click(wrapModificar);
}
function wrapModificar() {
    modificar(target);
}
function modificar(i) {
    console.log(i);
    var nombre = String($("#inputNombre").val());
    var apellido = String($("#inputApellido").val());
    var edad = Number($("#inputEdad").val());
    var horario = String($("#inputHorario").val());
    var legajo = Number($("#inputLegajo").val());
    var empleado = lista.filter(function (empleado) { return empleado.legajo === i; });
    empleado[0].nombre = nombre;
    empleado[0].apellido = apellido;
    empleado[0].edad = edad;
    empleado[0].horario = horario;
    empleado[0].legajo = legajo;
    mostrarEmpleados();
}
function wrapEliminar(e) {
    var trigger = e.target;
    var legajo = trigger.previousSibling.previousSibling.previousSibling.innerHTML;
    eliminar(legajo);
}
function eliminar(i) {
    console.log(i);
    lista = lista.filter(function (empleado) { return empleado.legajo === i; });
    mostrarEmpleados();
}
function filtrarPorHorario() {
}
function promedioEdadPorHorario() {
}
