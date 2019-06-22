var lista:Array<string> = new Array<string>();
//var target:number;

$(function()
{
    $("#btnAgregar").click(agregarEmpleado);
    $("#btnCancelar").click(limpiarFormulario);
    $("#aMostrar").click(mostrarEmpleados);
    $("#btnPromedio").click(promediar);
    $("#btnCerrarPromedio").click(borrarPromedio);
    if (localStorage.getItem("empleados")) 
    {
        lista = JSON.parse(localStorage.getItem("empleados"));  
    }
});

function borrarPromedio()
{
    $("#selectPromedio").val("Mañana");
    $("#pPromedio").html("");
}

function promediar()
{
    var turno = $("#selectPromedio").val();
    let promedio = lista.reduce((sum, empleado) => {return (JSON.parse(empleado)).horario === turno ? sum + 1 : sum}, 0) / lista.length;
    $("#pPromedio").html("Promedio: " + String(promedio));
}

function  agregarEmpleado():void
{
    let nombre = String($("#inputNombre").val());
    let apellido = String($("#inputApellido").val());
    let edad = Number($("#inputEdad").val());
    let horario = String($("#selectHorario").val());
    let legajo = Number($("#inputLegajo").val());

    lista.push(new persona.Empleado(nombre, apellido, edad, horario, legajo).empleadoToJson());
    limpiarFormulario();
    localStorage.setItem("empleados", JSON.stringify(lista));
}

function  limpiarFormulario():void
{
    $("#inputNombre").val("");
    $("#inputApellido").val("");
    $("#inputEdad").val("");
    $("#selectHorario").val("Mañana");
    $("#inputLegajo").val("");

    $("#btnAgregar").text("Agregar");
    $("#btnAgregar").click(agregarEmpleado);

    $("#headerForm").html("Alta empleado");
}

function  mostrarEmpleados():void
{
    console.log(lista);
    $("#tBody").empty();
    for (var i = 0; i < lista.length; i++) 
    {
        let empleado = JSON.parse(lista[i]);

        let tr = document.createElement("tr");

        let tdNombre = document.createElement("td");
        let nombre =  document.createTextNode(empleado.nombre);
        tdNombre.appendChild(nombre);
        tr.appendChild(tdNombre);

        let tdApellido = document.createElement("td");
        let apellido =  document.createTextNode(empleado.apellido);
        tdApellido.appendChild(apellido);
        tr.appendChild(tdApellido);

        let tdEdad = document.createElement("td");
        let edad =  document.createTextNode(String(empleado.edad));
        tdEdad.appendChild(edad);
        tr.appendChild(tdEdad);

        let tdLegajo = document.createElement("td");
        let legajo =  document.createTextNode(String(empleado.legajo));
        tdLegajo.appendChild(legajo);
        tr.appendChild(tdLegajo);

        let tdTurno = document.createElement("td");
        let turno =  document.createTextNode(empleado.horario);
        tdTurno.appendChild(turno);
        tr.appendChild(tdTurno);

       let btnModificar = document.createElement("button");
       btnModificar.addEventListener("click", cambiarForm);
       btnModificar.innerHTML = "Modificar";
       tr.appendChild(btnModificar);

       let btnEliminar = document.createElement("button");
       btnEliminar.addEventListener("click", wrapEliminar);
       btnEliminar.innerHTML = "Borrar";
       tr.appendChild(btnEliminar);

        $("#tBody").append(tr);
    }
}

function cambiarForm(e:Event) 
{
    let trigger = e.target as HTMLElement;
    let horario = trigger.previousSibling;
    let legajo = horario.previousSibling;
    let edad = legajo.previousSibling;
    let apellido = edad.previousSibling;
    let nombre = apellido.previousSibling;

    ($("#inputNombre").val(nombre.innerHTML));
    ($("#inputApellido").val(apellido.innerHTML));
    ($("#inputEdad").val(edad.innerHTML));
    ($("#selectHorario").val(horario.innerHTML));
    ($("#inputLegajo").val(legajo.innerHTML));

    $("#btnAgregar").text("Modificar");
    $("#btnAgregar").unbind( "click" );
    $("#btnAgregar").click(wrapModificar);

    $("#headerForm").html("Modificar empleado");
}

function wrapModificar()
{
    modificar(target);
}

function  modificar(i:number):void
{
    console.log(i);
    let nombre = String($("#inputNombre").val());
    let apellido = String($("#inputApellido").val());
    let edad = Number($("#inputEdad").val());
    let horario = String($("#selectHorario").val());
    let legajo = Number($("#inputLegajo").val());

    let empleado = lista.filter(empleado => empleado.legajo === i);
    
    empleado[0].nombre = nombre;
    empleado[0].apellido = apellido;
    empleado[0].edad = edad;
    empleado[0].horario = horario;
    empleado[0].legajo = legajo;

    mostrarEmpleados();
}

function wrapEliminar(e:Event)
{
    let trigger = e.target as HTMLElement;
    let legajo = trigger.previousSibling.previousSibling.previousSibling.innerHTML;
    eliminar(legajo);
}

function  eliminar(i:number):void
{
    lista = lista.filter(empleado => (JSON.parse(empleado)).legajo != i);
    localStorage.setItem("empleados", JSON.stringify(lista));
    mostrarEmpleados();
}

function  filtrarPorHorario():void
{

}

function  promedioEdadPorHorario():void
{

}
