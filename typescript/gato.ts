namespace animal
{
    export class Gato implements Animal
    {
        nombre:string="";
        constructor(nombre?:string)
        {
            if (nombre !=undefined) 
            {
                this.nombre = nombre;
            }   
        }

        hacerRuido():string
        {
            return "Miauuu!";
        }

        getNombre():string
        {
            return this.nombre;
        }

        setNombre(nombre:string)
        {
            this.nombre = nombre;
        }
    }
}