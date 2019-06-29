var vehiculos:Array<Entidades.Vehiculo> = new Array<Entidades.Vehiculo>();

$(function()
{
    $("#btnAgregar").click(agregar);
    $("#btnPromedio").click(promediar);
    $("#selectFiltro").change(filtrar);
    $("#btnLimpiar").click(limpiar);
    if (localStorage.getItem("vehiculos")) 
    {
        vehiculos = JSON.parse(localStorage.getItem("vehiculos"));  
    }
    mostrarLista();
});

function filtrar():void
{
    let tipo = String($("#selectFiltro").val());

    switch (tipo) {
        case "Auto":
            vehiculos = vehiculos.filter(vehiculo => vehiculo instanceof Entidades.Auto);
        break;

        case "Camioneta":
            vehiculos = vehiculos.filter(vehiculo => vehiculo instanceof Entidades.Camioneta);
        break;
    }
    mostrarLista();
}

function limpiar():void
{
    localStorage.clear();
    vehiculos = new Array<Entidades.Vehiculo>();
    mostrarLista();    
}

function getId():number
{
    if (vehiculos.length === 0) return 1;
    let ultimo = vehiculos.reduce((prev, act) => (prev.id > act.id) ? prev : act)
    return ultimo.id + 1;
}

function agregar():void
{
    let id = getId();
    let marca = String($("#inputMarca").val());
    let modelo = String($("#inputModelo").val());
    let precio = Number($("#inputPrecio").val());
    let tipo = String($("#selectAlta").val());
    console.log("AGREGANDO...");
    console.log(tipo);
    console.log(precio);
    switch (tipo) 
    {
        case "Auto":
            vehiculos.push(new Entidades.Auto(id, marca, modelo, precio));
            localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
            mostrarLista()
            console.log(vehiculos);
            break;

        case "Camioneta":
            vehiculos.push(new Entidades.Camioneta(id, marca, modelo, precio));
            localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
            mostrarLista()
            console.log(vehiculos);
        break;

        default:
            break;
    }
}

function promediar():void
{
    let promedio = vehiculos.reduce((sum, vehiculo) => {return sum + vehiculo.precio;}, 0) / vehiculos.length;
    $("#inputPromedio").val(promedio);
}

function mostrarLista():void
{
    let tipo = String($("#selectFiltro").val());
    $("#tBody").empty();

    for (var i = 0; i < vehiculos.length; i++) 
    {
        let vehiculo = vehiculos[i];

        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        let id =  document.createTextNode(String(vehiculo.id));
        tdId.appendChild(id);
        //tdId.setAttribute("hidden", "true");
        tr.appendChild(tdId);

        let tdMarca = document.createElement("td");
        let marca =  document.createTextNode(vehiculo.marca);
        tdMarca.appendChild(marca);
        tr.appendChild(tdMarca);

        let tdModelo = document.createElement("td");
        let modelo =  document.createTextNode(vehiculo.modelo);
        tdModelo.appendChild(modelo);
        tr.appendChild(tdModelo);

        let tdPrecio = document.createElement("td");
        console.log(vehiculo.precio);
        let precio =  document.createTextNode(String(vehiculo.precio));
        tdPrecio.appendChild(precio);
        tr.appendChild(tdPrecio);

        let btnEliminar = document.createElement("button");
        btnEliminar.addEventListener("click", eliminar);
        btnEliminar.innerHTML = "Borrar";
        tr.appendChild(btnEliminar);

        $("#tBody").append(tr);
    }
}

function eliminar(e:Event):void
{
    let trigger = e.target as HTMLElement;
    let id = Number(trigger.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML);
    console.log(trigger);
    console.log(id);
    vehiculos = vehiculos.filter(vehiculo => vehiculo.id != id);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    mostrarLista();
}
