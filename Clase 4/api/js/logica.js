var xml = new XMLHttpRequest(); // Variable global

window.addEventListener("load", function()
{
	document.getElementById("btn").addEventListener("click", enviarPost);
})

function callback()
{
	if (xml.readyState == 4) 
	{
		if (xml.status == 200) 
		{
			var respuesta = xml.responseText;
			if (respuesta == "true") 
			{
				alert("Login ok");
			}
			else if (respuesta == "false") 
			{
				alert("Usuario o contraseña incorrectos");	
			}
			else
			{
				alert("Error del servidor: " + respuesta);
			}
		}
	}
}

function enviarPost()
{
	var user = document.getElementById("usr").value;
	var password = document.getElementById("pass").value;

	if (user != "" && password != "")  // Comprobacion innecesaria: ya lo chequea el servidor
	{
		var parametros = "usr=" + user +"&pass=" + password; // "?usr" En GET porque viaja por url
		xml.open("POST", "http://localhost:3000/loginUsuario", true); // xml.open("GET", "http://localhost:3000/loginUsuario" + parametros, true);
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Obviado en GET
		xml.onreadystatechange = callback;
		xml.send(parametros); //xml.send();
	}
}