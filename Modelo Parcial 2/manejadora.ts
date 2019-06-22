var lista:Array<persona.Empleado> = new Array<persona.Empleado>();
var target:number;

$(function()
{
    $("#btnAgregar").click(agregarEmpleado);
    $("#aMostrar").click(mostrarEmpleados);
});

function  agregarEmpleado():void
{
    let nombre = String($("#inputNombre").val());
    let apellido = String($("#inputApellido").val());
    let edad = Number($("#inputEdad").val());
    let horario = String($("#inputHorario").val());
    let legajo = Number($("#inputLegajo").val());

    lista.push(new persona.Empleado(nombre, apellido, edad, horario, legajo));
    limpiarFormulario();
}

function  limpiarFormulario():void
{
    $("#inputNombre").val("");
    $("#inputApellido").val("");
    $("#inputEdad").val("");
    $("#inputHorario").val("");
    $("#inputLegajo").val("");
}

function  mostrarEmpleados():void
{
    console.log(lista);
    $("#tBody").empty();
    for (var i = 0; i < lista.length; i++) 
    {
        let empleado = lista[i];

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
    target = trigger.previousSibling.previousSibling.innerHTML;

    ($("#inputNombre").val());
    ($("#inputApellido").val());
    ($("#inputEdad").val());
    ($("#inputHorario").val());
    ($("#inputLegajo").val());

    $("#btnAgregar").text("Modificar");
    $("#btnAgregar").unbind( "click" );
    $("#btnAgregar").click(wrapModificar);
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
    let horario = String($("#inputHorario").val());
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
    console.log(i);
    lista = lista.filter(empleado => empleado.legajo === i);
    mostrarEmpleados();
}

function  filtrarPorHorario():void
{

}

function  promedioEdadPorHorario():void
{

}
