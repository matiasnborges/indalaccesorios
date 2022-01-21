//Declaracion de variables --------------------------------------------------------------------------------------------------------------------------------
let condicionIva = 0;
const iva = 21;
let opcionElegida = 0;
let subtotal = 0;
let total = 0;
let cantidad = 0;
let ivaTotal = 0;
let productoElegido = 0;
let ordenamiento = 1;
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
    constructor (codigo, descripcionComprada, cantidadComprada, subtotal) {
        this.codigo = codigo;
        this.descripcionComprada = descripcionComprada;
        this.cantidadComprada = cantidadComprada;
        this.subtotal = subtotal;
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

function agregarProductoComprado(codigo, descripcion, cantidad, subtotal) {
    productosComprados.push(new ProductoComprado(codigo, descripcion, cantidad, subtotal));    
}

function ordenarProductos(ordenamiento) {
    if (ordenamiento===2) {
        productos.sort((a, b) => { 
            if (a.precio === b.precio) {
                return 0;
            }
            else if (a.precio <  b.precio) {
                return -1;
            }
            else
                return 1;
        });   
    }
}

    // // Capturo el div con id container
    // const contenedor = document.getElementById("containerProducts");
    // // recorro el Array de productos con un for each
    // // el for each es un metodo que recibe como parametro una funcion de flecha
    // // esta funcion se ejecuta por cada elemento que tenga el array y le manda
    // //como parametro cada uno de los elementos.
    // // por cada vuelta ejecuta la funcion y dibuja una card
    // productos.forEach((producto) => {
    // //creo el elemento y lo guardo en la variable card
    // let card = document.createElement("div");
    // //como estoy usando bootstrap le agrego las clases que tiene la card que elegí
    // card.classList.add("card", "col-sm-12", "col-lg-3");
    // // a card le agrego el contenido html de la card, accediendo a los datos del array de objetos.
    // card.innerHTML = `
    //     <img src="${producto.imagen}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //     <h5 class="card-title">${producto.descripcion}</h5>
    //     <p class="card-text">${producto.precio}</p>
    //     <a href="#cart" class="btn btn-primary"  >Comprar</a>
    //     </div>
    //     `;
    // // a la variable contenedor donde tengo capturado el div contenedor le agrego
    // // la card que construi
    // contenedor.appendChild(card);
    // });

// Algoritmo principal ---------------------------------------------------------------------------------------------------------------------

condicionIva = parseInt(prompt(`Hola! Para comprar ingresa tu condicion de IVA: \n 1 - Responsable Inscripto \n 2 - Monotributista`));
ordenamiento = parseInt(prompt(`Por favor elegi el orden en que queres ver los productos: \n 1 - Por codigo \n 2 - Por menor precio \n Si ingresas cualquier otra opcion se ordenara por codigo`));
ordenarProductos(ordenamiento);

if (condicionIva==1) {
//Responsable Inscripto
    elegirOpcion();
    while(opcionElegida != 0 ){
        cantidad = parseInt(prompt("Por favor ingresa la cantidad deseada"));        
        if (opcionElegida <= productos.length && opcionElegida > 0) {
            buscarProducto(opcionElegida);
            calcularSubtotal(productoElegido.precio,cantidad);
            agregarProductoComprado(productoElegido.codigo, productoElegido.descripcion,cantidad,subtotal);
            calcularTotal(subtotal);
            totalizarIvaRespInscripto(productoElegido.calcularIvaRespInscriptoProducto(iva), cantidad);
        }
        else {
            alert("La opcion elegida es incorrecta, por favor elegir una opcion valida");
        }
        elegirOpcion();
    }

    const tableElement = document.getElementById("productosComprados");
    productosComprados.forEach((producto) => {
        let productComprado = document.createElement("tr");
        productComprado.innerHTML = `
                <td>${producto.cantidadComprada}</td>
                <td>${producto.descripcionComprada}</td>
                <td>$ ${producto.subtotal}</td>
            </tr>
            `;
        tableElement.appendChild(productComprado);
    });

    const mostrarTotal = document.getElementById("totalizador");
    let totalfinal = document.createElement("h2");
    totalfinal.innerHTML = 
                `El total de la compra es $${total} y el IVA es $${ivaTotal}
            </h2>
            `;
    mostrarTotal.appendChild(totalfinal);

} 
else if (condicionIva==2) {
//Monotributista
    elegirOpcion();
    while(opcionElegida != 0 ){
        cantidad = parseInt(prompt("Por favor ingresa la cantidad deseada"));
        if (opcionElegida <= productos.length && opcionElegida > 0) {
            buscarProducto(opcionElegida);
            calcularSubtotal(productoElegido.calcularPrecioMonotributo(iva),cantidad);
            calcularTotal(subtotal);
            agregarProductoComprado(productoElegido.codigo, productoElegido.descripcion,cantidad,subtotal);
        }
        else {
            alert("La opcion elegida es incorrecta, por favor elegir una opcion valida");
        }
    elegirOpcion();
    }

    //alert(`El total de la compra es $${total} IVA incluido por ser monotributo`);
    
    const tableElement = document.getElementById("productosComprados");
    productosComprados.forEach((producto) => {
        let productComprado = document.createElement("tr");
        productComprado.innerHTML = `
                <td>${producto.cantidadComprada}</td>
                <td>${producto.descripcionComprada}</td>
                <td>$ ${producto.subtotal}</td>
            </tr>
            `;
        tableElement.appendChild(productComprado);
    });

    const mostrarTotal = document.getElementById("totalizador");
    let totalfinal = document.createElement("h2");
    totalfinal.innerHTML = `El total de la compra es $${total} IVA incluido por ser monotributo
            </h2>`;
    mostrarTotal.appendChild(totalfinal);

}
else {
    alert("Ingresaste una opcion incorrecta, por favor volve a intentar ingresando: \n 1 - Para responsable inscripto \n 2 - Para monotributista");
}
