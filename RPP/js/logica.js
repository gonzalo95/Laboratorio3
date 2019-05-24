$(document).ready(CargarRegistros);

function CargarRegistros()
{
    $("#fondo").attr("hidden", false);

    $.get("http://localhost:3000/personajes", Callback);
}

function Callback(data, status)
{
    $("#fondo").attr("hidden", true);

    if (status == "success") 
    {
        CargarPersonas(data);
    }
    else
    {
        alert("Error en el servidor");
    }
}

function CargarPersonas(personas)
{
    console.log(personas);
    var tbody = $("#tbody");
    var fReader= new FileReader();
	for (var i = 0; i < personas.length; i++) 
	{
		var fila = document.createElement("tr");
        var persona = personas[i];

        var tdId = document.createElement("td");
        tdId.setAttribute("hidden", true);
        var id =  document.createTextNode(persona.id);
        tdId.append(id);
        fila.append(tdId);
        
        var tdFoto = document.createElement("td");
        var foto =  document.createElement("img");
        foto.setAttribute("src", persona.foto);
        tdFoto.append(foto);
        fila.append(tdFoto);

        var tdNombre = document.createElement("td");
        var nombre =  document.createTextNode(persona.nombre);
        tdNombre.append(nombre);
        fila.append(tdNombre);

        var tdApellido = document.createElement("td");
        var apellido =  document.createTextNode(persona.apellido);
        tdApellido.append(apellido);
        fila.append(tdApellido);

        var tdEstado = document.createElement("td");
        var estado =  document.createElement("select");
        var opVivo = document.createElement("option");
        opVivo.append(document.createTextNode("vivo"));
        if (persona.estado == "Vivo") opVivo.setAttribute("selected", true);
        var opMuerto = document.createElement("option");
        opMuerto.append(document.createTextNode("muerto"));
        if (persona.estado == "Muerto") opMuerto.setAttribute("selected", true);
        estado.append(opVivo);
        estado.append(opMuerto);
        tdEstado.append(estado);
        fila.append(tdEstado);

        tbody.append(fila);
    }
    $("img").click(EditarFoto);
}


function EditarFoto()
{
    var elemento = event.currentTarget;
    var tr = elemento.parentNode.parentNode;
    var id = tr.firstChild.innerText;
    console.log(id);
    var obj = {
        "id" : id,
        "foto" : elemento.getAttribute("src")
    };
    console.log(obj);
    $("#fondo").attr("hidden", false);
    $.post("http://localhost:3000/editarFoto", obj, CallbackEditar);
}

function CallbackEditar(data)
{
    console.log(data);
    $("#fondo").attr("hidden", true);
}