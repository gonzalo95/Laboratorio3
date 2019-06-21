"use strict";
var animal;
(function (animal) {
    var Gato = /** @class */ (function () {
        function Gato(nombre) {
            this.nombre = "";
            if (nombre != undefined) {
                this.nombre = nombre;
            }
        }
        Gato.prototype.hacerRuido = function () {
            return "Miauuu!";
        };
        Gato.prototype.getNombre = function () {
            return this.nombre;
        };
        Gato.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        return Gato;
    }());
    animal.Gato = Gato;
})(animal || (animal = {}));
