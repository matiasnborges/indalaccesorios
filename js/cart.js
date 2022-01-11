//Declaracion de variables --------------------------------------------------------------------------------------------------------------------------------
let condicionIva = 0;
const iva = 21;
let opcionElegida = 0;
let subtotal = 0;
let total = 0;
let cantidad = 0;
let ivaTotal = 0;
let productoElegido = 0;
const productos = [];
const productosComprados = [];

//Definicion de objetos -------------------------------------------------------------------------------------

class Producto{
    constructor (codigo, descripcion, precio){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precio  = parseFloat(precio);
    }
    calcularPrecioMonotributo (iva) {
        return this.precio * (1 + (iva / 100));
    }
    calcularIvaRespInscriptoProducto (iva) {
        return this.precio * (iva / 100);
    }
}

productos.push(new Producto(1,"T-92 x 100unidades",1000));
productos.push(new Producto(2,"T-87 x100 unidades",300));
productos.push(new Producto(3,"H-62 Falleba",500));

class ProductoComprado {
    constructor (descripcionComprada, cantidadComprada) {
        this.descripcionComprada = descripcionComprada;
        this.cantidadComprada = cantidadComprada;
    }
}

//Funciones --------------------------------------------------------------------------------------------------------------------------------

function elegirOpcion () {
    opcionElegida = parseInt(prompt(`Podes comprar los siguientes productos (precios sin IVA):
                                    \n ${productos[0].codigo} - ${productos[0].descripcion} $${productos[0].precio} \n ${productos[1].codigo} - ${productos[1].descripcion} $${productos[1].precio} \n ${productos[2].codigo} - ${productos[2].descripcion} $${productos[2].precio} \n 0 - Para salir 
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

function buscarProducto (opcionElegida) {
    productoElegido = productos.find(producto => producto.codigo === opcionElegida);
}

function agregarProductoComprado(descripcion,cantidad) {
    productosComprados.push(new ProductoComprado(descripcion,cantidad));    
}


// Algoritmo principal ---------------------------------------------------------------------------------------------------------------------

condicionIva = parseInt(prompt(`Hola! Para comprar ingresa tu condicion de IVA: \n 1 - Responsable Inscripto \n 2 - Monotributista`));

if (condicionIva==1) {
    //Responsable Inscripto
    elegirOpcion();
    while(opcionElegida != 0 ){
        cantidad = parseInt(prompt("Por favor ingresa la cantidad deseada"));        
        if (opcionElegida <= productos.length && opcionElegida > 0) {
            buscarProducto(opcionElegida);
            agregarProductoComprado(productoElegido.descripcion,cantidad);
            calcularSubtotal(productoElegido.precio,cantidad);
            calcularTotal(subtotal);
            totalizarIvaRespInscripto(productoElegido.calcularIvaRespInscriptoProducto(iva), cantidad);
        }
        else {
            alert("La opcion elegida es incorrecta, por favor elegir una opcion valida");
        }
        elegirOpcion();
    }
    alert(`El total de la compra es $${total} y el IVA es $${ivaTotal}`);
    //
    //aca quisiera mostrar un alert con todo el array de productosComprados junto con el siguiente formato
    //     alert(`Detalle de los productos comprados:
    //           \n Cantidad: ${productosComprados[0].cantidadComprada} - Producto: ${productosComprados[0].descripcionComprada}
    //           \n Cantidad: ${productosComprados[1].cantidadComprada} - Producto: ${productosComprados[1].descripcionComprada}
    //           \n Cantidad: ${productosComprados[n].cantidadComprada} - Producto: ${productosComprados[n].descripcionComprada}`);

} 
else if (condicionIva==2) {
    //Monotributista
    elegirOpcion();
    while(opcionElegida != 0 ){
        cantidad = parseInt(prompt("Por favor ingresa la cantidad deseada"));
        if (opcionElegida <= productos.length && opcionElegida > 0) {
            buscarProducto(opcionElegida);
            agregarProductoComprado(productoElegido.descripcion,cantidad);
            calcularSubtotal(productoElegido.calcularPrecioMonotributo(iva),cantidad);
            calcularTotal(subtotal);
        }
        else {
            alert("La opcion elegida es incorrecta, por favor elegir una opcion valida");
        }
    elegirOpcion();
    }
    alert(`El total de la compra es $${total} IVA incluido por ser monotributo`);
    //
    //aca quisiera mostrar un alert con todo el array de productosComprados junto con el siguiente formato
    //     alert(`Detalle de los productos comprados:
    //           \n Cantidad: ${productosComprados[0].cantidadComprada} - Producto: ${productosComprados[0].descripcionComprada}
    //           \n Cantidad: ${productosComprados[n].cantidadComprada} - Producto: ${productosComprados[n].descripcionComprada}`);
}
else {
    alert("Ingresaste una opcion incorrecta, por favor volve a intentar ingresando: \n 1 - Para responsable inscripto \n 2 - Para monotributista");
}
