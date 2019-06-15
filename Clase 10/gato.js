"use strict";
var animal;
(function (animal) {
    var Gato = /** @class */ (function () {
        function Gato() {
        }
        Gato.prototype.hacerRuido = function () {
            return "Miauuu!";
        };
        return Gato;
    }());
    animal.Gato = Gato;
})(animal || (animal = {}));
