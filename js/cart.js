//Declaracion de variables --------------------------------------------------------------------------------------------------------------------------------
let condicionIva = 0;
let nombreCliente = "";
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
productos.push(new Producto(4,"T-88 x100 unidades",600));

class ProductoComprado {
    constructor (codigo, descripcionComprada, cantidadComprada, subtotal) {
        this.codigo = codigo;
        this.descripcionComprada = descripcionComprada;
        this.cantidadComprada = cantidadComprada;
        this.subtotal = subtotal;
    }
}

//Funciones --------------------------------------------------------------------------------------------------------------------------------
function ingresarCliente() {
    let clientDetails = document.getElementById("clientDetail");
    clientDetails.addEventListener("submit", validarFormularioCliente);
}

function validarFormularioCliente(e){
    let clientDetails = document.getElementById("clientDetail");
    e.preventDefault();
    console.log("Formulario Enviado");
    condicionIva = document.getElementById("condicionIva").value;
    nombreCliente = document.getElementById("nombre").value;
    console.log(condicionIva);
    clientDetails.parentNode.removeChild(clientDetails);
    const saludo = document.getElementById("welcome");
    let agregarSaludo = document.createElement("h2");
    principalFunction(condicionIva);
    agregarSaludo.innerHTML = `Bienvenido ${nombreCliente}, este es el detalle de tu compra: </h2>`;
    saludo.appendChild(agregarSaludo);
    
}


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

// Algoritmo principal ---------------------------------------------------------------------------------------------------------------------


//ordenamiento = parseInt(prompt(`Por favor elegi el orden en que queres ver los productos: \n 1 - Por codigo \n 2 - Por menor precio \n Si ingresas cualquier otra opcion se ordenara por codigo`));
//ordenarProductos(ordenamiento);

ingresarCliente();

function principalFunction(condicionIva) {
    

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

    const tableTitle = document.getElementById("tableHead");
    let titleProducts = document.createElement("tr");
    titleProducts.innerHTML = ` <th scope="col">Cantidad</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Subtotal</th>
                                </tr>`;
    tableTitle.appendChild(titleProducts);

    const tableElement = document.getElementById("productosComprados");
    productosComprados.forEach((producto) => {
        let productComprado = document.createElement("tr");
        productComprado.innerHTML = `
                <td>${producto.cantidadComprada}</td>
                <td>${producto.descripcionComprada}</td>
                <td>$ ${producto.subtotal}</td>
            </tr>`;
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

    const tableTitle = document.getElementById("tableHead");
    let titleProducts = document.createElement("tr");
    titleProducts.innerHTML = ` <th scope="col">Cantidad</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Subtotal</th>
                                </tr>`;
    tableTitle.appendChild(titleProducts);
   
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

}