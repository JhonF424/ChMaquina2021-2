/**
 * ------------------------------------------------------------------------
 * Apartado donde se crean las primeras instancias al ingresar al ChMáquina 
 * ------------------------------------------------------------------------
 */

var todosLosProgramas = new Array();

var reader;
var lineaRetorne;
//Se obtienen los valores de la memoria y el kernel
let kernelValue;
let memoryValue;
//Se crea el vector de memoria
var memoria = new Array();
document.getElementById('kernelInput').value = 79;
document.getElementById('memoryInput').value = 120;
const setValues = document.getElementById('setValues').addEventListener('click', () => {
    kernelValue = parseInt(document.getElementById('kernelInput').value);
    memoryValue = parseInt(document.getElementById('memoryInput').value);

    //El espacio del Kernel debe ser inferior al total de la memoria
    if (kernelValue < memoryValue) {
        for (let i = 0; i <= kernelValue; i++) {
            memoria[i] = "Linux Kernel - Jhon Franco";
        }
    } else {
        alert("La memoria debe ser mayor que el Kernel");
    }

});


//Se instancia el valor inicial del acumulador
var acumulador = 0;
document.getElementById('acumulador').innerText = acumulador;

//Se crea el almacenamiento para las variables que cree el usuario
var almacenamientoVariables = new Array();
var almacenamientoEtiquetas = new Array();


/**
 * ------------------------------------------------
 * Apartado donde se da inicio al uso del ChMáquina 
 * ------------------------------------------------
 */
//Permite cargar el archivo al ChMáquina
const inputFile = document.getElementById('file-input').addEventListener('change', abrirArchivo);

//Botón que da inicio a la ejecución del ChMáquina con los programas cargados en la memoria
const startBtn = document.getElementById('start');
startBtn.addEventListener('click', start);

const stepBtn = document.getElementById('stepByStep');
stepBtn.addEventListener('click', stepByStep);

const btnSJFNoExp = document.getElementById('SJFNoExp');
btnSJFNoExp.addEventListener('click', SJFNoExp);

const btnFCFS = document.getElementById('FCFS');
btnFCFS.addEventListener('click', start);

function abrirArchivo(evt) {

    let file = evt.target.files[0];
    reader = new FileReader();

    reader.onload = function (e) {
        let content = e.target.result;
        if (!verificarErrores(content)) {
            let instruccion = content.split('\n');
            if (memoria.length + instruccion.length < memoryValue) {
                let programa = new Array();
                for (let i = 0; i < instruccion.length; i++) {
                    if (!instruccion[i].includes("//") || !instruccion[i].includes("/")) {
                        memoria.push(instruccion[i].trim());
                        programa.push(instruccion[i].trim());
                    }
                    if (instruccion[i].includes("retorne")) {
                        lineaRetorne = i;
                    }
                }
                todosLosProgramas.push(programa);
            } else {
                //Valida que la memoria no se desborde 
                alert("La memoria está llena, no se pueden agregar más instrucciones");
            }
            document.getElementById('compilador').value += instruccion.join('') + '\n';
            document.getElementById('compilador').scrollTop = document.getElementById('compilador').scrollHeight
        }
    }
    reader.readAsText(file);
}


function verificarErrores(contenido) {
    var fragmentoTexto = contenido.split("\n");
    var error = false;
    for (var i = 0; i < fragmentoTexto.length; i++) {

        var palabra = fragmentoTexto[i].split(" ");

        if (palabra[0] == "cargue" || palabra[0] == "pare" || palabra[0] == "itere" ||
            palabra[0] == "almacene" || palabra[0] == "nueva" || palabra[0] == "lea" ||
            palabra[0] == "sume" || palabra[0] == "reste" || palabra[0] == "multiplique" ||
            palabra[0] == "divida" || palabra[0] == "potencia" || palabra[0] == "modulo" ||
            palabra[0] == "concatene" || palabra[0] == "elimine" || palabra[0] == "extraiga" ||
            palabra[0] == "y" || palabra[0] == "o" || palabra[0] == "no" || palabra[0] == "muestre" ||
            palabra[0] == "imprima" || palabra[0] == "vaya" || palabra[0] == "vayasi" ||
            palabra[0] == "etiqueta" || palabra[0] == "xxx" || palabra[0] == "retorne") {
        }
        else {
            if (palabra[0] == null || palabra[0] == "" || palabra[0] == "//") {

            }
            else {
                alert("Error en la linea numero: " + i);
                error = true;
            }
        }
    }
    return error;
}

function start() {
    for (let i = 0; i <= memoria.length - 1; i++) {
        document.getElementById('MapaM').value += memoria[i] + "\n";
        document.getElementById("MapaM").scrollTop = document.getElementById("MapaM").scrollHeight
        let ins = memoria[i].split(" ");
        switch (ins[0]) {
            case "nueva":
                nueva(ins);
                break;
            case "almacene":
                almacene(ins);
                break;
            case "cargue":
                cargue(ins);
                break;
            case "lea":
                lea(ins);
                break;
            case "sume":
                sume(ins);
                break;
            case "reste":
                reste(ins);
                break;
            case "multiplique":
                multiplique(ins);
                break;
            case "divida":
                divida(ins);
                break;
            case "concatene":
                concatene(ins);
                break;
            case "elimine":
                elimine(ins);
                break;
            case "extraiga":
                extraiga(ins);
                break;
            case "y" || "Y":
                y(ins);
                break;
            case "o" || "O":
                o(ins);
                break;
            case "muestre":
                muestre(ins);
                break;
            case "imprima":
                imprima(ins);
                break;
            case "vaya":
                i = vaya(ins);
                break;
            case "vayasi":
                vayasi(ins);
                break;
            case "xxx" || "XXX":
                xxx(ins);
                break;
            case "etiqueta":
                etiqueta(ins);
                break;
            case "retorne":
                retorne(ins);
                break;
            default:
                break;
        }


    }


}

function stepByStep() {
    for (let i = 0; i <= memoria.length - 1; i++) {
        document.getElementById('MapaM').value += memoria[i] + "\n";
        document.getElementById("MapaM").scrollTop = document.getElementById("MapaM").scrollHeight
        let ins = memoria[i].split(" ");
        let sbs = 1;
        switch (ins[0]) {
            case "nueva":
                nueva(ins, sbs);
                break;
            case "almacene":
                almacene(ins, sbs);
                break;
            case "cargue":
                cargue(ins, sbs);
                break;
            case "lea":
                lea(ins, sbs);
                break;
            case "sume":
                sume(ins, sbs);
                break;
            case "reste":
                reste(ins, sbs);
                break;
            case "multiplique":
                multiplique(ins, sbs);
                break;
            case "divida":
                divida(ins, sbs);
                break;
            case "concatene":
                concatene(ins, sbs);
                break;
            case "elimine":
                elimine(ins, sbs);
                break;
            case "extraiga":
                extraiga(ins, sbs);
                break;
            case "y" || "Y":
                y(ins, sbs);
                break;
            case "o" || "O":
                o(ins, sbs);
                break;
            case "muestre":
                muestre(ins, sbs);
                break;
            case "imprima":
                imprima(ins, sbs);
                break;
            case "vaya":
                i = vaya(ins, sbs);
                break;
            case "vayasi":
                vayasi(ins, sbs);
                break;
            case "xxx" || "XXX":
                xxx(ins, sbs);
                break;
            case "etiqueta":
                etiqueta(ins, sbs);
                break;
            case "retorne":
                retorne(ins, sbs);
                break;
            default:
                break;
        }
    }

    //document.getElementById('mapaM').value += memoria;
}




function SJFNoExp() {
    alert("Método: SJF No Expropiativo")
    todosLosProgramas.sort();
    console.log(todosLosProgramas);
    todosLosProgramas.forEach(item => {
        for (let i = 0; i < item.length; i++) {

            let ins = item[i].split(" ");
            switch (ins[0]) {
                case "nueva":
                    nueva(ins);
                    break;
                case "almacene":
                    almacene(ins);
                    break;
                case "cargue":
                    cargue(ins);
                    break;
                case "lea":
                    lea(ins);
                    break;
                case "sume":
                    sume(ins);
                    break;
                case "reste":
                    reste(ins);
                    break;
                case "multiplique":
                    multiplique(ins);
                    break;
                case "divida":
                    divida(ins);
                    break;
                case "concatene":
                    concatene(ins);
                    break;
                case "elimine":
                    elimine(ins);
                    break;
                case "extraiga":
                    extraiga(ins);
                    break;
                case "y" || "Y":
                    y(ins);
                    break;
                case "o" || "O":
                    o(ins);
                    break;
                case "muestre":
                    muestre(ins);
                    break;
                case "imprima":
                    imprima(ins);
                    break;
                case "vaya":
                    i = vaya(ins);
                    break;
                case "vayasi":
                    vayasi(ins);
                    break;
                case "xxx" || "XXX":
                    xxx(ins);
                    break;
                case "etiqueta":
                    etiqueta(ins);
                    break;
                case "retorne":
                    retorne(ins);
                    break;
                default:
                    break;
            }
        }
    })

}

function FCFS() {
    const startBtn = document.getElementById('start');
    startBtn.addEventListener('click', start);
}

function RoundRobin() {
    
}

function nueva(ins, sbs) {
    if (sbs == 1) {
        alert("Se crea una nueva variable");
    }
    let nuevaVariable = new Object();
    if (ins.length == 4) {
        nuevaVariable.nombre = ins[1];
        nuevaVariable.tipo = ins[2];
        nuevaVariable.valor = parseInt(ins[3]);
    } else if (ins.length == 3) {
        nuevaVariable.nombre = ins[1];
        nuevaVariable.tipo = ins[2];

        switch (ins[2]) {
            case "C":
                nuevaVariable.valor = ' ';
                break;
            case "I" || "R":
                nuevaVariable.valor = 0;
                break;
            case "L":
                nuevaVariable.valor = 0;
                break;
            default:
                break;
        }
    }
    almacenamientoVariables.push(nuevaVariable);
    document.getElementById('variables').value += "Variable: " + nuevaVariable.nombre + "\n";
    document.getElementById('variables').scrollTop = document.getElementById('variables').scrollHeight
}

function cargue(ins, sbs) {
    if (sbs == 1) {
        alert("Se carga la variable en el acumulador");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            acumulador = e.valor;
            document.getElementById('acumulador').innerText = acumulador;
        }
    });

}

function almacene(ins, sbs) {
    if (sbs == 1) {
        alert("Se almacena el valor del acumulador en la variable seleccionada");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            e.valor = acumulador;
        }
    });

}

function lea(ins, sbs) {
    if (sbs == 1) {
        alert("Se lee el nuevo valor para la variable seleccionada");
    }
    let newVal = parseInt(prompt("Ingrese el valor para la nueva variable: "));
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            e.valor = newVal;
        }
    });
}


function sume(ins, sbs) {
    if (sbs == 1) {
        alert("Se suma el valor del acumulador con el valor de la variable seleccionada");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            let suma = parseInt(e.valor);
            let ac = parseInt(acumulador);
            acumulador = ac + suma;
            document.getElementById('acumulador').innerText = acumulador;
        }
    });
}


function reste(ins, sbs) {
    if (sbs == 1) {
        alert("Se resta el valor del acumulador con el valor de la variable seleccionada");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            let resta = parseInt(e.valor);
            let ac = parseInt(acumulador);
            acumulador = ac - resta;
            document.getElementById('acumulador').innerText = acumulador;
        }
    });
}

function multiplique(ins, sbs) {
    if (sbs == 1) {
        alert("Se multiplica el valor del acumulador con el valor de la variable seleccionada");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            let multi = parseInt(e.valor);
            let ac = parseInt(acumulador);
            acumulador = ac * multi;
            document.getElementById('acumulador').innerText = acumulador;
        }
    });
}

function divida(ins, sbs) {
    if (sbs == 1) {
        alert("Se divide el valor del acumulador con el valor de la variable seleccionada");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            let div = parseInt(e.valor);
            let ac = parseInt(acumulador);
            if (div == 0 || ac == 0) {
                alert("Error: NO se puede dividir por cero");
                prompt("")
            }
            acumulador = ac / div;
            document.getElementById('acumulador').innerText = acumulador;
        }
    });
}

function potencia(ins, sbs) {
    if (sbs == 1) {
        alert("Se eleva el valor del acumulador con el valor de la variable seleccionada");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            let pow = parseInt(e.valor);
            let ac = parseInt(acumulador);
            acumulador = Math.pow(ac, pow);
            document.getElementById('acumulador').innerText = acumulador;
        }
    });
}


function modulo(ins, sbs) {
    if (sbs == 1) {
        alert("Se obtiene el módulo del acumulador con el valor de la variable seleccionada");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            let mod = parseInt(e.valor);
            let ac = parseInt(acumulador);
            acumulador = ac % mod;
            document.getElementById('acumulador').innerText = acumulador;
        }
    });
}


function concatene(ins, sbs) {
    if (sbs == 1) {
        alert("Se concatena el valor del acumulador con el valor de la variable seleccionada");
    }
    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            acumulador = acumulador + e.valor;
            document.getElementById('acumulador').innerText = acumulador;
        }
    });
}

//ee

function y(ins, sbs) {
    if (sbs == 1) {
        alert("Se hace una condición lógica AND con las variables seleccionadas");
    }
    let buscarVariable1 = ins[1];
    let buscarVariable2 = ins[2];
    let buscarVariable3 = ins[3];
    let a, b, c;
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable1) {
            a = e.valor;
        } else if (e.nombre == buscarVariable2) {
            b = e.valor;
        }

        if (a == b) {
            c = true;
        } else {
            c = false;
        }

        if (e.nombre == buscarVariable3) {
            if (c == true) {
                e.valor = 1;
            } else {
                e.valor = 0;
            }
        }


    });
}


function o(ins) {
    let buscarVariable1 = ins[1];
    let buscarVariable2 = ins[2];
    let buscarVariable3 = ins[3];
    let a, b, c;
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable1) {
            a = e.valor;
        } else if (e.nombre == buscarVariable2) {
            b = e.valor;
        }

        if (a == b) {
            c = true;
        } else {
            c = false;
        }

        if (e.nombre == buscarVariable3) {
            if (c == true) {
                e.valor = 1;
            } else {
                e.valor = 0;
            }
        }


    });
}

function no() {

}


function muestre(ins, sbs) {
    if (sbs == 1) {
        alert("Se muestra por pantalla el valor de la variable seleccionada");
    }

    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            if (ins == acumulador) {
                document.getElementById('pantalla').value += acumulador + "\n";
            } else {
                document.getElementById('pantalla').value += e.valor + "\n";
            }

        }
    });
}


function imprima(ins, sbs) {
    if (sbs == 1) {
        alert("Se imprime el valor de la variable seleccionada");
    }

    let buscarVariable = ins[1];
    almacenamientoVariables.forEach(function (e) {
        if (e.nombre == buscarVariable) {
            if (ins == acumulador) {
                document.getElementById('impresora').value += acumulador;
            } else {
                document.getElementById('impresora').value += e.valor;
            }

        }
    });

}

function etiqueta(ins, sbs) {
    if (sbs == 1) {
        alert("Se crea una nueva etiqueta");
    }
    let index = parseInt(ins[2]);
    let nuevaEtiqueta = new Object();
    nuevaEtiqueta.nombre = ins[1];
    nuevaEtiqueta.posicion = index;
    almacenamientoEtiquetas.push(nuevaEtiqueta);
    document.getElementById('Etiquetas').value += "Etiqueta: " + nuevaEtiqueta.nombre + "\n";
    document.getElementById('Etiquetas').scrollTop = document.getElementById('Etiquetas').scrollHeight
}

function vaya(ins, sbs) {
    if (sbs == 1) {
        alert("Se redirije la ejecución de la máquina hacia la etiqueta dada");
    }
    let buscarEtiqueta = ins[1];
    let position = 0;
    almacenamientoEtiquetas.forEach(function (e) {
        if (e.nombre == buscarEtiqueta) {
            position = lineaRetorne + e.posicion;
        }
    });

    return position;
}

function vayasi(sbs, ins) {
    if (sbs == 1) {
        alert("Valida las condiciones, y determina a cual etiqueta debe ir");
    }
    let ac = parseInt(acumulador);
    let position = 0;
    let et1 = ins[1];
    let et2 = ins[2];
    if (ac > 0) {
        almacenamientoEtiquetas.forEach(function (e) {
            if (e.nombre == et1) {
                position = lineaRetorne + e.posicion;
            }
        });

        return position;
    } else if (ac < 0) {
        almacenamientoEtiquetas.forEach(function (e) {
            if (e.nombre == et2) {
                position = lineaRetorne + e.posicion;
            }
        });

        return position;
    } else if (ac === 0) {
        console.log("No debería hacer nada...");
    }
}

function retorne(ins, sbs) {
    if (sbs == 1) {
        alert("Se finaliza la ejecución del programa actual \n y se da paso a el siguiente programa cargado en memoria. Además se reestablece el acumulador, se muestra por pantalla y se imprime en la impresora el valor final del acumulador.");
    }

    document.getElementById('impresora').value += "\n" + "Acumulador final del programa: " + acumulador + "\n";
    document.getElementById('pantalla').value += "Acumulador final del programa: " + acumulador + "\n";
    lineaRetorne = memoria.indexOf("retorne");
    almacenamientoEtiquetas = [];
    almacenamientoVariables = [];

}