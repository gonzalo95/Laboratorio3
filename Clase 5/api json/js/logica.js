var xml = new XMLHttpRequest();

window.addEventListener("load", CargarRegistros)
window.addEventListener("load", function()
{
	document.getElementById("btnGuardar").addEventListener("click", Abrir);
	document.getElementById("btnCerrar").addEventListener("click", Cerrar);
	document.getElementById("btnCargar").addEventListener("click", Cargar);
});

function callback()
{
	if (xml.readyState == 4) 
	{
		if (xml.status == 200) 
		{
			var tbody = document.getElementById("tbody");
			var personas = JSON.parse(xml.responseText);
			
			for (var i = 0; i < personas.length; i++) 
			{	
				var persona = personas[i];

				tbody.innerHTML += "<tr><td>" + persona.nombre + "</td><td>" + persona.apellido + "</td><td>" + persona.fecha + 
				"</td><td>" + persona.telefono + "</td></tr>";
			}
		}
	}
}

function CargarRegistros()
{
	xml.open("GET", "http://localhost:3000/personas", true);
	xml.onreadystatechange = callback;
	xml.send();
}

function Abrir()
{
	var div = document.getElementById("div");
	div.hidden = false;
}

function Cerrar()
{
	var div = document.getElementById("div");
	div.hidden = true;
}

function Cargar()
{
	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;
	var fecha = document.getElementById("fecha").value;
	var telefono = document.getElementById("telefono").value;

	if (nombre != "" && apellido != "" && fecha != "" && telefono != "") 
	{
		tbody.innerHTML += "<tr><td>" + nombre + "</td><td>" + apellido + "</td><td>" + fecha + 
		"</td><td>" + telefono + "</td></tr>";
	}
	else
	{
		alert("Datos incompletos!");
	}
}