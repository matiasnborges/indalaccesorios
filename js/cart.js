//Variables --------------------------------------------------------------------------------------------------------------------------------
let condicionIva = parseInt(prompt("Hola! Para comprar ingresa: 1 - Para responsable inscripto o 2 - para monotributista"));
const iva = 21;
let opcionElegida = 0;
let subtotal = 0;
let total = 0;
let cantidad = 0;
let ivaTotal = 0;
let precioMonotributo = 0;
let optionOne = 300;
let optionTwo = 500;
let optionThree = 1000;


//Funciones --------------------------------------------------------------------------------------------------------------------------------
function elegirOpcion () {
    opcionElegida = parseInt(prompt("Podes comprar los siguientes productos (precios sin IVA): \n 1 - T-92 x 100unidades $" + optionOne +
     "\n 2 - T-87 x100 unidades $" + optionTwo +
     "\n 3 - H-62 Falleba $" + optionThree +
     "\n 0 - Para salir \n Elegi una de las opciones"));
}

function calcularIvaRespInscripto (precioVenta, iva) {
    ivaTotal = ivaTotal + (precioVenta * (iva / 100));
}

function calcularPrecioMonotributo (precioVenta, iva) {
    precioMonotributo = precioVenta * (1 + (iva / 100));
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
                calcularSubtotal(optionOne,cantidad);
                calcularTotal(subtotal);
                calcularIvaRespInscripto(optionOne,iva);                
                break;
            case 2:
                calcularSubtotal(optionTwo,cantidad);
                calcularTotal(subtotal);
                calcularIvaRespInscripto(optionTwo,iva);     
                break;
            case 3:
                calcularSubtotal(optionThree,cantidad);
                calcularTotal(subtotal);
                calcularIvaRespInscripto(optionThree,iva);    
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
                calcularPrecioMonotributo(optionOne,iva);
                calcularSubtotal(precioMonotributo,cantidad);
                calcularTotal(subtotal);              
                break;
            case 2:
                calcularPrecioMonotributo(optionTwo,iva);
                calcularSubtotal(precioMonotributo,cantidad);
                calcularTotal(subtotal);       
                break;
            case 3:
                calcularPrecioMonotributo(optionThree,iva);
                calcularSubtotal(precioMonotributo,cantidad);
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
