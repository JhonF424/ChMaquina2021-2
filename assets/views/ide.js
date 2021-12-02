document.getElementById('downloadBtn').addEventListener('click', download);

function download() {
    let btnDownload = document.getElementById('downloadBtn');
    content = document.getElementById('ide').value;
    if (verificarErrores(content)) {
        alert('No se puede descargar, porque el archivo contiene errores.');
    } else {
        btnDownload.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        btnDownload.setAttribute('download', "archivo.ch");
    }
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

