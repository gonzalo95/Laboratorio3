$(document).ready();
$("#id").click();
$.get("http://localhost:3000/personas", callback);

function callback(data, status)
{

}

$.post("http://localhost:3000/nueva", 
    {
        nombre: "gonzalo",
        apellido: "greco"
    }, callbackPost);

/*
npm init
npm install jquery --save
npm install
*/