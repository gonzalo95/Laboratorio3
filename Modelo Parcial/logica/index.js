var xml = new XMLHttpRequest();

window.addEventListener("load", function()
{
	document.getElementById("btnPostear").addEventListener("click", abrir);
	document.getElementById("btnCerrar").addEventListener("click", cerrar);
	document.getElementById("btnAceptar").addEventListener("click", postear);
});

// Vos le pasas el nombre del elemento y te devuelve el valor (obviar el 2º parametro)
function getParameterByName(name, url) 
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}   

function callback()
{
	if (xml.readyState == 4) 
	{
		if (xml.status == 200) 
		{
            var respuesta = xml.responseText;
            alert(respuesta);
            var respuesta = JSON.parse(respuesta);

            /*
            document.getElementById("tbody").innerHTML += "<tr><td>" + respuesta.title +
                                                          "</td><td>" + respuesta.header +
                                                          "</td><td>" + respuesta.texto +
                                                          "</td></tr>";  */
		}
	}
}

function abrir()
{
	var div = document.getElementById("div");
	div.hidden = false;
}

function cerrar()
{
	var div = document.getElementById("div");
	div.hidden = true;
}

function postear()
{
    var titulo = document.getElementById("titulo").value;
    var header = document.getElementById("header").value;
    var texto = document.getElementById("texto").value;
    var autor = getParameterByName("email");

    console.log(titulo);
    console.log(header);
    console.log(texto);
    console.log(autor);
/*
    var datosPost = 
    {
        texttitle: titulo,
        textheader: header,
        posttext: texto,
        author: autor
    }
*/

var datosPost = 
{
    "title": titulo,
    "header": header,
    "posttext": texto,
    "author": autor
}
    xml.open("POST", "http://localhost:1337/postearNuevaEntrada", true);
    //xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.onreadystatechange = callback;
    xml.send(datosPost);
}