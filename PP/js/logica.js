var xml = new XMLHttpRequest();
var nodo;

window.addEventListener("load", CargarRegistros)
window.addEventListener("load", function()
{
    document.getElementById("btnCerrar").addEventListener("click", Cerrar);
    document.getElementById("btnEliminar").addEventListener("click", Eliminar);
    document.getElementById("btnModificar").addEventListener("click", Modificar);
});

function CargarRegistros()
{
    var fondo = document.getElementById("fondo");
    fondo.hidden = false;

    xml.open("GET", "http://localhost:3000/materias", true);
    xml.onreadystatechange = Callback;
    xml.send();
}

function Callback()
{
	if (xml.readyState == 4) 
	{
        var fondo = document.getElementById("fondo");
		if (xml.status == 200) 
		{
			var materias = JSON.parse(xml.responseText);
            CargarMaterias(materias);
            fondo.hidden = true;
        }
        else
        {
            alert("Error en el servidor");
            fondo.hidden = true;
        }
	}
}

function CargarMaterias(materias)
{
	var tbody = document.getElementById("tbody");
	for (var i = 0; i < materias.length; i++) 
	{
		var fila = document.createElement("tr");
		var obj = materias[i];
		var columnas = Object.keys(obj);

		for (var j = 0; j < columnas.length; j++) 
		{
            var cel = document.createElement("td");
            if (j == 0) cel.setAttribute("hidden", true);
			var texto = document.createTextNode(obj[columnas[j]]);
			cel.appendChild(texto);
			fila.appendChild(cel);
        }
        fila.addEventListener("dblclick", MostrarRecuadro);
		tbody.appendChild(fila);
	}
}

function MostrarRecuadro()
{
    var elemento = event.target;
    nodo = elemento;
    var div = document.getElementById("div");
    div.hidden = false;
    var tr = nodo.parentNode;
    var tds = tr.children;
   
    var id = tr.firstElementChild;
    var nombre = id.nextElementSibling;
    var cuatrimestre = nombre.nextElementSibling;
    var fecha = cuatrimestre.nextElementSibling;
    var turno = fecha.nextElementSibling;

    console.log(fecha.innerText);
    console.log(fecha.innerText.split("/").reverse().join("/"));
    
    document.getElementById("nombre").value = nombre.innerText;
    document.getElementById("nombre").classList.remove("conError");
    document.getElementById("cuatrimestre").value = cuatrimestre.innerText;
    document.getElementById("fecha").value = fecha.innerText.split("/").reverse().join("-");
    document.getElementById("fecha").classList.remove("conError");
    if (turno.innerText == "Mañana")
    {
        document.getElementById("turnoM").checked = true;
    }
    else
    {
        document.getElementById("turnoN").checked = true;
    }
}

function Cerrar()
{
    var div = document.getElementById("div");
	div.hidden = true;
}

function Modificar()
{
    var tr = nodo.parentNode;
    var tds = tr.children;
    var id = tr.firstElementChild;
    var cuatrimestre = id.nextElementSibling.nextElementSibling;

    var nombre = document.getElementById("nombre").value;
    var fecha = document.getElementById("fecha").value;

    if(document.getElementById("turnoM").checked == true)
    {
        var turno = "Mañana";
    }
    else
    {
        var turno = "Noche";
    }

    console.log(fecha);
    console.log(fecha.split("-").join("/"));
    console.log(fecha.split("-").reverse().join("/"));

    if (Validar())
    {
        var obj = 
        {
            "id": id.innerText,
            "nombre": nombre,
            "cuatrimestre": cuatrimestre.innerText,
            "fechaFinal": fecha.split("-").reverse().join("/"),
            "turno": turno
        };
        
        var fondo = document.getElementById("fondo");
        fondo.hidden = false;

        xml.open("POST", "http://localhost:3000/editar", true);
        xml.setRequestHeader("Content-type", "application/json");
        xml.onreadystatechange = CallbackModificar;
        xml.send(JSON.stringify(obj));
    }
}

function CallbackModificar()
{
	if (xml.readyState == 4) 
	{
        var fondo = document.getElementById("fondo");
		if (xml.status == 200) 
		{
            fondo.hidden = true;
            var respuesta = JSON.parse(xml.responseText);
            console.log(respuesta);
            if (respuesta.type == "ok")
            {
                ModificarRegistro();
            }
        }
        else
        {
            fondo.hidden = true;
            alert("Error en el servidor");
        }
	}    
}

function ModificarRegistro()
{
    var tr = nodo.parentNode;
    var tds = tr.children;

    var id = tr.firstElementChild;
    var nombre = id.nextElementSibling;
    var cuatrimestre = nombre.nextElementSibling;
    var fecha = cuatrimestre.nextElementSibling;
    var turno = fecha.nextElementSibling;
    
    nombre.innerText = document.getElementById("nombre").value;
    fecha.innerText = document.getElementById("fecha").value.split("-").reverse().join("/");
    
    if(document.getElementById("turnoM").checked == true)
    {
        turno.innerText = "Mañana";
    }
    else
    {
        turno.innerText = "Noche";
    }
}

function Eliminar()
{
    var tr = nodo.parentNode;
    var id = tr.firstElementChild;
    var obj = 
    {
        "id": id.innerText,
    };
    
    var fondo = document.getElementById("fondo");
    fondo.hidden = false;

    xml.open("POST", "http://localhost:3000/eliminar", true);
    xml.setRequestHeader("Content-type", "application/json");
    xml.onreadystatechange = CallbackEliminar;
    xml.send(JSON.stringify(obj));
}

function CallbackEliminar()
{
	if (xml.readyState == 4) 
	{
        var fondo = document.getElementById("fondo");
		if (xml.status == 200) 
		{
            fondo.hidden = true;
            var respuesta = JSON.parse(xml.responseText);
            console.log(respuesta);
            if(respuesta["type"] == "ok")
            {
                BorrarRegistro();
            }
            else
            {
                alert("El servidor no permite eliminar ese registro");
            }
        }
        else
        {
            fondo.hidden = true;
            alert("Error en el servidor");
        }
	}    
}

function BorrarRegistro()
{
    var tr = nodo.parentNode;
    tr.parentNode.removeChild(tr);
}

function Validar()
{
    var fecha = new Date(document.getElementById("fecha").value);
    console.log(fecha.getTime());
    var date = new Date();
    console.log(date.getTime());
    console.log(document.getElementById("nombre").value.length);
    if (document.getElementById("nombre").value.length >= 6)
    {
        if (fecha >= date)
        {
            return true;
        }
        else
        {
            document.getElementById("fecha").className = "conError";
            return false;
        }
    }
    else
    {
        document.getElementById("nombre").className = "conError";
        return false;
    }

}

function validarFecha(fecha)
{
    //var date = Date.parse(fecha);
    //console.log(date);
    //var f = new Date();
    //f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear())
}