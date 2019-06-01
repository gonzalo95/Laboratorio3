//Map
let nums = [1, 2, 3, 4, 5];

console.log("Numeros con map: ", nums.map(function(num){
                                    return num * num;
                                    }));

console.log("Con funcion lambda: ", nums.map(num => num * num));

//Filter


console.log("Numeros mayores a 3: ", nums.filter(function(num){
                                        return num > 3;
                                        }));

console.log("Con funcion lambda: ", nums.filter(num => num > 3)); // Segundo parametro es indice.

//Reduce

console.log("Sumatoria: ", nums.reduce(function(total, num){
                                        return total += num;
                                        }, 0));

//Concatenacion

console.log("Mayores de 3 al cuadrado: ", nums.filter(num => num > 3).map(num => num * num));