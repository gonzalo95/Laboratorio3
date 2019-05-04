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
			localStorage.setItem("personas", xml.responseText);

			for (var i = 0; i < personas.length; i++) 
			{
				var fila = document.createElement("tr");
				var obj = personas[i];
				var columnas = Object.keys(obj);

				for (var j = 0; j < columnas.length; j++) 
				{
					var col = document.createElement("td");
					var texto = document.createTextNode(obj[columnas[j]]);
					col.appendChild(texto);
					fila.appendChild(col);
				}

				var cel = document.createElement("td");
				var link = document.createElement("a");
				link.setAttribute("href","#");
				link.addEventListener("click", borrar);
				var texto = document.createTextNode("Borrar");
				link.appendChild(texto);
				cel.appendChild(link);
				fila.appendChild(cel);

				tbody.appendChild(fila);
			}			

			//array.slice(i, 1) para borrar
		}
	}
}

function borrar(event)
{
	event.preventDefault();
	var seleccionado = event.target;
	var fila = seleccionado.parentNode.parentNode;
	var tbody = fila.parentNode;
	tbody.removeChild(fila);
}

function CargarRegistros()
{
	if (localStorage.getItem("personas") == null) 
	{
		xml.open("GET", "http://localhost:3000/personas", true);
		xml.onreadystatechange = callback;
		xml.send();
	}
	else
	{

	}
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