//Variables --------------------------------------------------------------------------------------------------------------------------------
let condicionIva = parseInt(prompt("Hola! Para comprar ingresa: 1 - Para responsable inscripto o 2 - para monotributista"));
const iva = 21;
let opcionElegida = 0;
let subtotal = 0;
let total = 0;
let cantidad = 0;
let ivaTotal = 0;

//Definicion de objetos -------------------------------------------------------------------------------------

class Producto{
    constructor (codigo, descripcion, precio){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precio  = precio;
    }
    calcularPrecioMonotributo (iva) {
        return this.precio * (1 + (iva / 100));
    }
    calcularIvaRespInscriptoProducto (iva) {
        return this.precio * (iva / 100);
    }
}

const producto1 = new Producto(1,"T-92 x 100unidades",300);
const producto2 = new Producto(2,"T-87 x100 unidades",500);
const producto3 = new Producto(3,"H-62 Falleba",1000);



//Funciones --------------------------------------------------------------------------------------------------------------------------------
function elegirOpcion () {
    opcionElegida = parseInt(prompt(`Podes comprar los siguientes productos (precios sin IVA):
                                    \n ${producto1.codigo} - ${producto1.descripcion} $${producto1.precio} \n ${producto2.codigo} - ${producto2.descripcion} $${producto2.precio} \n ${producto3.codigo} - ${producto3.descripcion} $${producto3.precio} \n 0 - Para salir 
                                    \n Elegi una de las opciones`));
    
}

function totalizarIvaRespInscripto (ivaProducto, cantidad) {
    ivaTotal = ivaTotal + (ivaProducto * cantidad);
}

function calcularSubtotal (precioVenta, cantidad) {
    subtotal = precioVenta * cantidad;
}

function calcularTotal (subtotal) {
    total = total + subtotal;
}


// Algoritmo principal ---------------------------------------------------------------------------------------------------------------------
if (condicionIva==1) {
    //Responsable Inscripto
    elegirOpcion();
    while(opcionElegida != 0 ){
        cantidad = parseInt(prompt("Por favor ingresa la cantidad deseada"));        
        switch (opcionElegida) {
            case 1:
                calcularSubtotal(producto1.precio,cantidad);
                calcularTotal(subtotal);
                totalizarIvaRespInscripto(producto1.calcularIvaRespInscriptoProducto(iva), cantidad);         
                break;
            case 2:
                calcularSubtotal(producto2.precio,cantidad);
                calcularTotal(subtotal);
                totalizarIvaRespInscripto(producto2.calcularIvaRespInscriptoProducto(iva), cantidad);         
                break;
            case 3:
                calcularSubtotal(producto3.precio,cantidad);
                calcularTotal(subtotal);
                totalizarIvaRespInscripto(producto3.calcularIvaRespInscriptoProducto(iva), cantidad);         
                break;
            default:
                alert("La opcion elegida es incorrecta, por favor elegir una opcion valida");
                break;
        }
        elegirOpcion();
    }
    alert(`El total de la compra es $${total} y el IVA es $${ivaTotal}`);
} 
else if (condicionIva==2) {
    //Monotributista
    elegirOpcion();
    while(opcionElegida != 0 ){
        cantidad = parseInt(prompt("Por favor ingresa la cantidad deseada"));        
        switch (opcionElegida) {
            case 1:
                calcularSubtotal(producto1.calcularPrecioMonotributo(iva),cantidad);
                calcularTotal(subtotal);              
                break;
            case 2:
                calcularSubtotal(producto2.calcularPrecioMonotributo(iva),cantidad);
                calcularTotal(subtotal);       
                break;
            case 3:
                calcularSubtotal(producto3.calcularPrecioMonotributo(iva),cantidad);
                calcularTotal(subtotal); 
                break;
            default:
                alert("La opcion elegida es incorrecta, por favor elegir una opcion valida");
                break;
        }
        elegirOpcion();
    }
    alert(`El total de la compra es $${total} IVA incluido por ser monotributo`);
}
else {
    alert("Ingresaste una opcion incorrecta, por favor volve a intentar ingresando: \n 1 - Para responsable inscripto \n 2 - Para monotributista");
}
