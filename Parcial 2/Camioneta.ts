namespace Entidades
{
    export class Camioneta extends Vehiculo
    {
        cuatroXcuatro:boolean;

        constructor(id:number, marca:string,  modelo:string, precio:number, cuatroXcuatro:boolean = true)
        {
            super(id, marca, modelo, precio);
            this.cuatroXcuatro = cuatroXcuatro;
        }
    }
}