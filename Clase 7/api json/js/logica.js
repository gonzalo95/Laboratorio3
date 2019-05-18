var xml = new XMLHttpRequest();

window.addEventListener("load", CargarRegistros)
window.addEventListener("load", function()
{
	document.getElementById("btnGuardar").addEventListener("click", Abrir);
	document.getElementById("btnCerrar").addEventListener("click", Cerrar);
	document.getElementById("btnCargar").addEventListener("click", Cargar);
});

function Callback()
{
	if (xml.readyState == 4) 
	{
		if (xml.status == 200) 
		{
			var personas = JSON.parse(xml.responseText);
			localStorage.setItem("personas", xml.responseText);

			CargarPersonas(personas);
		}
	}
}

function Borrar(event)
{
	event.preventDefault();
	var elemento = event.target;
	var tr = elemento.parentNode.parentNode;
	var tds = tr.children;
	var persona = {};
	for(i = 0; i < tds.length-1; i++)
	{
		persona[tds[i].getAttribute("id")] = tds[i].innerHTML;
	}
	tr.parentNode.removeChild(tr);
	BorrarPersonaLocalStorage(persona);
}

function BorrarPersonaLocalStorage(persona)
{
	listaPersonas = JSON.parse(localStorage.getItem("personas"));
	for(i = 0; i < listaPersonas.length; i++)
	{
		if(JSON.stringify(listaPersonas[i]) == JSON.stringify(persona)){
			listaPersonas.splice(i, 1);
			break;
		}
	}
	localStorage.setItem("personas", JSON.stringify(listaPersonas));
}
function CargarRegistros()
{
	if (localStorage.getItem("personas") == null) 
	{
		xml.open("GET", "http://localhost:3000/personas", true);
		xml.onreadystatechange = Callback;
		xml.send();
	}
	else
	{
		CargarPersonas(JSON.parse(localStorage.getItem("personas")));
	}
}

function CargarPersonas(personas)
{
	var tbody = document.getElementById("tbody");
	for (var i = 0; i < personas.length; i++) 
	{
		var fila = document.createElement("tr");
		var obj = personas[i];
		var columnas = Object.keys(obj);

		for (var j = 0; j < columnas.length; j++) 
		{
			var col = document.createElement("td");
			col.setAttribute("id", columnas[j]);
			var texto = document.createTextNode(obj[columnas[j]]);
			col.appendChild(texto);
			fila.appendChild(col);
		}

		var cel = document.createElement("td");
		var link = document.createElement("a");
		link.setAttribute("href","#");
		link.addEventListener("click", Borrar);
		link.appendChild(document.createTextNode("Borrar - "));
		cel.appendChild(link);
		var modificar = document.createElement("a");
		modificar.setAttribute("href", "#");
		modificar.addEventListener("click", Modificar);
		modificar.appendChild(document.createTextNode("Modificar"));
		cel.appendChild(modificar);
		fila.appendChild(cel);

		tbody.appendChild(fila);
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
	var tbody = document.getElementById("tbody");

	var nombre = document.createTextNode(document.getElementById("nombre").value);
	var apellido = document.createTextNode(document.getElementById("apellido").value);
	var fecha = document.createTextNode(document.getElementById("fecha").value);
	var telefono = document.createTextNode(document.getElementById("telefono").value);

	var fila = document.createElement("tr");
	var nodoNombre = document.createElement("td");
	nodoNombre.appendChild(nombre);
	nodoNombre.setAttribute("id", "nombre");
	fila.appendChild(nodoNombre);

	var nodoApellido = document.createElement("td");
	nodoApellido.appendChild(apellido);
	nodoApellido.setAttribute("id", "apellido");
	fila.appendChild(nodoApellido);

	var nodoFecha = document.createElement("td");
	nodoFecha.appendChild(fecha);
	nodoFecha.setAttribute("id", "fecha");
	fila.appendChild(nodoFecha);

	var nodoTelefono = document.createElement("td");
	nodoTelefono.appendChild(telefono);
	nodoTelefono.setAttribute("id", "telefono");
	fila.appendChild(nodoTelefono);

	var nodoAccion = document.createElement("td");
	var borrar = document.createElement("a");
	borrar.setAttribute("href", "#");
	borrar.addEventListener("click", Borrar);
	borrar.appendChild(document.createTextNode("Borrar - "));
	nodoAccion.appendChild(borrar);
	var modificar = document.createElement("a");
	modificar.setAttribute("href", "#");
	modificar.addEventListener("click", Modificar);
	modificar.appendChild(document.createTextNode("Modificar"));
	nodoAccion.appendChild(modificar);
	fila.appendChild(nodoAccion);

	tbody.appendChild(fila);

	var personas = JSON.parse(localStorage.getItem("personas"));
	personas.push({
				nombre:document.getElementById("nombre").value,
				apellido:document.getElementById("apellido").value,
				fecha:document.getElementById("fecha").value,
				telefono:document.getElementById("telefono").value
				});
	localStorage.setItem("personas", JSON.stringify(personas));
}

function Modificar(event)
{
	var div = document.getElementById("div");
	div.hidden = false;
	var btn = document.getElementById("btnCargar")
	btn.removeEventListener("click", Cargar);
	btn.addEventListener("click", Actualizar);
}

function Actualizar(event)
{
	event.preventDefault();

	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;
	var fecha = document.getElementById("fecha").value;
	var telefono = document.getElementById("telefono").value;

	var elemento = event.target;
	var tr = elemento.parentNode.parentNode;
	var tds = tr.children;
	var persona = {};
	for(i = 0; i < tds.length-1; i++)
	{
		persona[tds[i].getAttribute("id")] = tds[i].innerHTML;

	}
}

function cargar(event)
{
	console.log(event.target.parentNode);
	var hijos = event.target.parentNode.children;
	for(var i = 0; i < hijos.length; i++)
	{
		document.getElementById("nombre").value = hijos[0].innerHTML;
		document.getElementById("apellido").value = hijos[1].innerHTML;
		document.getElementById("fecha").value = hijos[2].innerHTML;
		document.getElementById("telefono").value = hijos[3].innerHTML;
	}
}

