"use strict";
var lista = new Array();
//var target:number;
$(function () {
    $("#btnAgregar").click(agregarEmpleado);
    $("#btnCancelar").click(limpiarFormulario);
    $("#aMostrar").click(mostrarEmpleados);
    $("#btnPromedio").click(promediar);
    $("#btnCerrarPromedio").click(borrarPromedio);
    if (localStorage.getItem("empleados")) {
        lista = JSON.parse(localStorage.getItem("empleados"));
    }
});
function borrarPromedio() {
    $("#selectPromedio").val("Mañana");
    $("#pPromedio").html("");
}
function promediar() {
    var turno = $("#selectPromedio").val();
    var promedio = lista.reduce(function (sum, empleado) { return (JSON.parse(empleado)).horario === turno ? sum + 1 : sum; }, 0) / lista.length;
    $("#pPromedio").html("Promedio: " + String(promedio));
}
function agregarEmpleado() {
    var nombre = String($("#inputNombre").val());
    var apellido = String($("#inputApellido").val());
    var edad = Number($("#inputEdad").val());
    var horario = String($("#selectHorario").val());
    var legajo = Number($("#inputLegajo").val());
    lista.push(new persona.Empleado(nombre, apellido, edad, horario, legajo).empleadoToJson());
    limpiarFormulario();
    localStorage.setItem("empleados", JSON.stringify(lista));
}
function limpiarFormulario() {
    $("#inputNombre").val("");
    $("#inputApellido").val("");
    $("#inputEdad").val("");
    $("#selectHorario").val("Mañana");
    $("#inputLegajo").val("");
    $("#btnAgregar").text("Agregar");
    $("#btnAgregar").click(agregarEmpleado);
    $("#headerForm").html("Alta empleado");
}
function mostrarEmpleados() {
    console.log(lista);
    $("#tBody").empty();
    for (var i = 0; i < lista.length; i++) {
        var empleado = JSON.parse(lista[i]);
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
    var horario = trigger.previousSibling;
    var legajo = horario.previousSibling;
    var edad = legajo.previousSibling;
    var apellido = edad.previousSibling;
    var nombre = apellido.previousSibling;
    ($("#inputNombre").val(nombre.innerHTML));
    ($("#inputApellido").val(apellido.innerHTML));
    ($("#inputEdad").val(edad.innerHTML));
    ($("#selectHorario").val(horario.innerHTML));
    ($("#inputLegajo").val(legajo.innerHTML));
    $("#btnAgregar").text("Modificar");
    $("#btnAgregar").unbind("click");
    $("#btnAgregar").click(wrapModificar);
    $("#headerForm").html("Modificar empleado");
}
function wrapModificar() {
    modificar(target);
}
function modificar(i) {
    console.log(i);
    var nombre = String($("#inputNombre").val());
    var apellido = String($("#inputApellido").val());
    var edad = Number($("#inputEdad").val());
    var horario = String($("#selectHorario").val());
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
    lista = lista.filter(function (empleado) { return (JSON.parse(empleado)).legajo != i; });
    localStorage.setItem("empleados", JSON.stringify(lista));
    mostrarEmpleados();
}
function filtrarPorHorario() {
}
function promedioEdadPorHorario() {
}
