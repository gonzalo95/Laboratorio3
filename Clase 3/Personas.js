window.addEventListener("load", function()
{
	document.getElementById("btnGuardar").addEventListener("click", Validar);
	document.getElementById("btnAbrir").addEventListener("click", Abrir);
	document.getElementById("btnCerrar").addEventListener("click", Cerrar);
});

function Mostrar()
{
	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;
	var tbody = document.getElementById("tbody");
	tbody.innerHTML += "<tr><td>" + nombre + "</td><td>" + apellido + "</td><td>" + "<a href=''>borrar</a>" + "</td></tr>";
}

function Validar()
{
	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;

	if (nombre == "" || apellido == "") 
	{
		alert("Datos invalidos!");
		document.getElementById("nombre").className = "conError";
		document.getElementById("apellido").className = "conError";
	}
	else if (confirm("Esta seguro?") == true)
	{
		document.getElementById("nombre").className = "sinError";
		document.getElementById("apellido").className = "sinError";
		Mostrar();
	}
}

function Abrir()
{
	var abrir = document.getElementById("btnAbrir");
	var div = document.getElementById("div");
	abrir.hidden=true;
	div.hidden=false;
}

function Cerrar()
{
	var abrir = document.getElementById("btnAbrir");
	var div = document.getElementById("div");
	abrir.hidden=false;
	div.hidden=true;
}