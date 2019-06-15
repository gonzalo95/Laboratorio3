
// Objetos
var batimovil:{carroceria:String, modelo:String, antibalas:boolean, pasajeros:Number} = {
  carroceria: "Negra",
  modelo: "6x6",
  antibalas: true,
  pasajeros:4
};

var bumblebee{carroceria:String, modelo:String, antibalas:boolean, pasajeros:Number, disparar:()=>void?} = {
  carroceria: "Amarillo con negro",
  modelo: "4x2",
  antibalas: true,
  pasajeros:4,
  disparar(){ // El metodo disparar es opcional
    console.log("Disparando");
  }
};


// Villanos debe de ser un arreglo de objetos personalizados
var villanos:any[] = [{
  nombre:"Lex Luthor",
  edad: 54,
  mutante:false
},{
  nombre: "Erik Magnus Lehnsherr",
  edad: 49,
  mutante: true
},{
  nombre: "James Logan",
  edad: undefined,
  mutante: true
}];

// Multiples tipos
// cree dos tipos, uno para charles y otro para apocalipsis
type charles = {poder:String, estatura:Number};
var charles = {
  poder:"psiquico",
  estatura: 1.78
};

type apocalipsis = {lider:boolean, miembros:String[]};
var apocalipsis = {
  lider:true,
  miembros: ["Magneto","Tormenta","Psylocke","Angel"]
}

// Mystique, debe poder ser cualquiera de esos dos mutantes (charles o apocalipsis)
var mystique: charles | apocalipsis;

mystique = charles;
mystique = apocalipsis;
