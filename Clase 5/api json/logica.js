var xml = new XMLHttpRequest();

window.addEventListener("load", CargarRegistros)

function callback()
{
	var tbody = document.getElementById("tbody");
	var personas = xml.responseText;
	//alert(xml.responseText);
	
	for (var i = 0; i < personas.length; i++) 
	{
		if (i == 0) 
		{
			var persona = personas[i];
			alert(persona);
		}
		/*
		var persona = personas[i];
		tbody.innerHTML += "<tr><td>" + persona.nombre + "</td><td>" + persona.apellido + "</td><td>" + persona.fecha + 
		"</td><td>" + persona.telefono + "</td></tr>";*/
	}
}

function CargarRegistros()
{
	xml.open("GET", "http://localhost:3000/personas", true);
	xml.onreadystatechange = callback;
	xml.send();
}
