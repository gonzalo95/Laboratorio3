"use strict";
var Entidades;
(function (Entidades) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            if (id != undefined && marca != undefined && modelo != undefined && precio != undefined) {
                this.id = id;
                this.marca = marca;
                this.modelo = modelo;
                this.precio = precio;
            }
        }
        return Vehiculo;
    }());
    Entidades.Vehiculo = Vehiculo;
})(Entidades || (Entidades = {}));
