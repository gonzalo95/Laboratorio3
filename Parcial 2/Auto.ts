namespace Entidades
{
    export class Auto extends Vehiculo
    {
        cantidadPuertas:number;

        constructor(id:number, marca:string,  modelo:string, precio:number, cantidadPuertas:number = 4)
        {
            super(id, marca, modelo, precio);
            this.cantidadPuertas = cantidadPuertas;
        }
    }
}