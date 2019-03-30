window.addEventListener("click", function()
{
	var btnSumar = document.getElementById("btnSumar").addEventListener("click", Sumar);
	var btnGuardar = document.getElementById("btnGurdar").addEventListener("click", Guardar);
});

function Sumar()
{
	var op1 = document.getElementById("op1").value;
	var op2 = document.getElementById("op2").value;
	document.getElementById("resultado").value = parseInt(op1) + parseInt(op2);
}

function Guardar() 
{
	var op1 = document.getElementById("op1").value;
	var op2 = document.getElementById("op2").value;
	var resultado = document.getElementById("resultado").value;

	var tbody = document.getElementById("tbody");
	tbody.innerHTML = "<tr><td>" + op1 + "</td><td>"  + op2 + "</td><td>" + resultado + "</td></tr";
}