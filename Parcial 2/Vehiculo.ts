namespace Entidades
{
    export class Vehiculo
    {
        id:number;
        marca:string;
        modelo:string;
        precio:number;

        constructor(id:number, marca:string,  modelo:string, precio:number)
        {
            if (id != undefined && marca != undefined && modelo != undefined && precio != undefined)
            {
                this.id = id;
                this.marca = marca;
                this.modelo = modelo;
                this.precio = precio;
            }   
        }
    }
}