namespace animal
{
    export class Perro implements Animal
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
            return "Guauu!";
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
