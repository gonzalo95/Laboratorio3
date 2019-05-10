/* 
var getnotas = localStorage.getItem("notas");
if (getnotas == null) {
    window.onload = pedirnotasGet;

}
else {
    console.log("Entro al else" + getnotas);
    window.onload = armarListaConLocalSt; //Armo la funcion para invocarla despues de armar el cuerpo HTML.
}

var httpReq = new XMLHttpRequest();

function armarListaConLocalSt() {
    armarLista(JSON.parse(getnotas));
}

function pedirnotasGet() {
    var parametros = "";
    var url = "http://localhost:3000/notas";
    var tipo = true;

    $.ajax({ //PETICION GET
        url: "http://localhost:3000/notas",
        success: function(result){
            var stringnotas = JSON.stringify(result);
            armarLista(result);
            localStorage.setItem("notas", JSON.stringify(result));
            console.log(result);
        }
    });   

}

function armarLista(notas) {
    var values = localStorage.getItem("values");
    values = JSON.parse(values);

    // alert(values.type);
    if (values.type === "Admin") {
            $("thead tr").append("<th>Acciones</th>");
        }

    var i;
    for (i = 0; i < notas.length; i++) {

            $("#tbody").append("<tr class='"+(notas[i].notas<4?'noAprobado':'')+"'><td>" + notas[i].nombre + "</td><td>" + notas[i].legajo + "</td><td>"
                + notas[i].materia + "</td><td>" + notas[i].notas + "</td>"
                +(values.type === "Admin"?"<td><a href='#' onClick='editar(" + i + ")'>Editar</a> | <a href='#' onClick='eliminar(" + i + ")'>Eliminar notas</a></td></tr>":"</tr>"));
       

    }
   // $("tbody").innerHTML = cuerpo;
}

function mostrarDiv() {
    //alert("Agregar Persona");
    $("divPersona").hidden = false;
}

function eliminar(index){
    getnotas = localStorage.getItem("notas");
    var array = JSON.parse(getnotas);
    var id = array[index].id;

    var obj = {
        id : id,
    }
    var jsonString = JSON.stringify(obj);

    $.ajax({ //PETICION POST
        url: "http://localhost:3000/eliminarnotas",
        data: obj,
        type: "POST",
        success: function (result) {
            response(result);
            console.log(result);
        }
    });
}


function editar(index) { //Implementar editar!!
    getnotas = localStorage.getItem("notas");
    var array = JSON.parse(getnotas);
    alert(array);
    $("#nombre").val(array[index].nombre);
    $("#materia").val(array[index].materia);
    $("#notas").val(array[index].notas);
    $("#legajo").val(array[index].legajo);
    $("#id").val(array[index].id);
    $("#edit").show();
    }

function editUser(){
    var nombre =  $("#nombre").val();
    var materia = $("#materia").val();
    var notas = $("#notas").val();
    var legajo = $("#legajo").val();
    var id =  $("#id").val();
    $("#edit").hide();

    var obj = {
        id : id,
        legajo: legajo,
        nombre: nombre,
        materia: materia,
        notas: notas
    }
    var jsonString = JSON.stringify(obj);
    console.log(jsonString);

    $.ajax({ //PETICION POST
        url: "http://localhost:3000/editarnotas",
        data: obj,
        type: "POST",
        success: function (result) {
            response(result);
            console.log(result);
            armarListaConLocalSt();s
        }
    });

}

function response(respuesta){
    var type = respuesta.type;
    var msg = respuesta.message;

    if (type==="ok"){
        alert("Se ha editado correctamente!!");
        pedirnotasGet();
        location.reload();
    }
    else{
        $("#msgError").val(msg);
        $("#divError").show();
    }

}

function reload(){
    $("#divError").hide();
    pedirnotasGet();
    location.reload();

}





 */


var xml = new XMLHttpRequest();

//variables globales
var nombre;
var apellido;
var fecha;
var numero;
var nodo;

window.addEventListener("load", CargarRegistros)
window.addEventListener("load", function(){
    var btnEditar = document.getElementById("btnEditar").addEventListener("click", editar);
    var btnCerrar = document.getElementById("cerrarEditar").addEventListener("click", cerrarEditar);
});

function callback()
{
	if (xml.readyState == 4) 
	{
		if (xml.status == 200) 
		{

			var notas = JSON.parse(xml.responseText);
			localStorage.setItem("notas", xml.responseText);
			console.log(notas);
			mostrarnotas(xml.responseText);	
			
			//array.slice(i, 1) para borrar
		}
		else
		{
			alert("Error en el servidor: " + xml.status);
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
	if (localStorage.getItem("notas") == null) 
	{
		xml.open("GET", "http://localhost:3000/notas", true); //post
		//xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = callback;
		xml.send(); //xml.send(parametro);
	}
	else
	{
		mostrarnotas(localStorage.getItem("notas"));
	}
}

function mostrarnotas(string_notas)
{
	var notas = JSON.parse(string_notas);
	var tbody = document.getElementById("tbody");
	for (var i = 0; i < notas.length; i++) 
	{
		var fila = document.createElement("tr");
		var obj = notas[i];
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
        

        var cel = document.createElement("td");
		var link = document.createElement("a");
		link.setAttribute("href","#");
		link.addEventListener("click", modificarFila);
		var texto = document.createTextNode("Modificar");
		link.appendChild(texto);
		cel.appendChild(link);
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
	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;
	var fecha = document.getElementById("fecha").value;
	var nota = document.getElementById("nota").value;

	if (nombre != "" && apellido != "" && fecha != "" && nota != "") 
	{
		tbody.innerHTML += "<tr><td>" + nombre + "</td><td>" + apellido + "</td><td>" + fecha + 
		"</td><td>" + nota + "</td><td>" + "</td></tr>";
	}
	else
	{
		alert("Datos incompletos!");
	}
}



function modificarFila(event){    
    event.preventDefault();
    var a = event.srcElement;
    var parent = a;
    
    while(parent.nodeName !== "TR"){        
        parent = parent.parentNode;
        if(parent.nodeName == "TR")
         {
        //console.log(parent.hasAttribute("nombre"));
        var nombre = parent.firstElementChild;
        var apellido = nombre.nextElementSibling;
        var fecha = apellido.nextElementSibling;
        var numero = fecha.nextElementSibling;

        nodo = parent;
        //falta verificar q no sean nulos en un if
         /*
        nombre.innerText = $("nombreM").value;
        apellido.innerText =$("apellidoM").value 
        fecha.innerText = $("fechaM").value;
        numero.innerText = $("telefonoM").value;*/

        MostrarModificar();
         }
    }
    //parent.parentNode.removeChild(parent);
}


function MostrarModificar(){
    var contAgregar = document.getElementById("edit");
    contAgregar.hidden=false;
   }

function editar(){
    nombre = document.getElementById("nombre").value;
    apellido = document.getElementById("materia").value;
    fecha = document.getElementById("legajo").value;
    numero = document.getElementById("nota").value;

    var nombre2 = nodo.firstElementChild;
    var apellido2 = nombre2.nextElementSibling;
    var fecha2 = apellido2.nextElementSibling;
    var numero2 = fecha2.nextElementSibling;


    //falta verificar q no sean nulos en un if
    
    nombre2.innerText = nombre;
    apellido2.innerText = apellido; 
    fecha2.innerText = fecha;
    numero2.innerText = numero;
}

function cerrarEditar(){
    var div = document.getElementById("edit");
    div.hidden = true;
}

   