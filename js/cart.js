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

//Cargo los productos en el HTML ------------------------------------------------------------------------------------------------
const catalog = document.getElementById("productOffer");
productos.forEach((producto) => {
  let card = document.createElement("div");
  card.classList.add("card", "w-50");
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${producto.descripcion}</h5>
      <p class="card-text">$${producto.precio}</p>
      <h3 id="codigo-${producto.codigo}" class="d-none ">${producto.codigo}</h3>
      <div class="input-group mb-2">
        <input type="text" id="cantidad-${producto.codigo}" class="form-control" placeholder="Ingresar cantidad" aria-label="Ingresar cantidad" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="btn-${producto.codigo}" onClick="comprarProducto(${producto.codigo})">Comprar</button>
      </div>
    </div>
      `;
  catalog.appendChild(card);
});


//Funciones --------------------------------------------------------------------------------------------------------------------------------
function ingresarCliente() {
    let clientDetails = document.getElementById("clientDetail");
    clientDetails.addEventListener("submit", validarFormularioCliente);
}

function validarFormularioCliente(e){
    let clientDetails = document.getElementById("clientDetail");
    e.preventDefault();
    condicionIva = document.getElementById("condicionIva").value;
    nombreCliente = document.getElementById("nombre").value;
    clientDetails.parentNode.removeChild(clientDetails);
    const saludo = document.getElementById("welcome");
    let agregarSaludo = document.createElement("h2");
    agregarSaludo.innerHTML = `Bienvenido ${nombreCliente}, ingresaste como ${condicionIva} </h2>`;
    saludo.appendChild(agregarSaludo);
    
}

function comprarProducto(_codigoProductoComprado) {
    let codigoProductoComprado = parseInt(_codigoProductoComprado);
    let cantidad = parseInt(document.getElementById(`cantidad-${_codigoProductoComprado}`).value);
    buscarProducto(codigoProductoComprado);
    calcularSubtotal(productoElegido.precio,cantidad);
    agregarProductoComprado(productoElegido.codigo, productoElegido.descripcion,cantidad,subtotal);
    calcularTotal(subtotal);
    totalizarIvaRespInscripto(productoElegido.calcularIvaRespInscriptoProducto(iva), cantidad);
    armarTotalizador();
}

function buscarProducto (opcionElegida) {
    productoElegido = productos.find(producto => producto.codigo === opcionElegida);
}

function totalizarIvaRespInscripto (ivaProducto, cantidad) {
    ivaTotal = ivaTotal + (ivaProducto * cantidad);
}
function calcularSubtotal (precioVenta, cantidad) {
    subtotal = precioVenta * cantidad;
}

function agregarProductoComprado(codigoAgregado, descripcion, cantidad, subtotal) {
    let productoParaAgregar = productosComprados.find(producto => producto.codigo === codigoAgregado);
    if (Boolean(productoParaAgregar) == true) {
        total = total - productoParaAgregar.subtotal;
        ivaTotal = ivaTotal - (productoParaAgregar.subtotal * 0.21);
        productoParaAgregar.cantidadComprada = cantidad;
        productoParaAgregar.subtotal = subtotal;
    } else {
        productosComprados.push(new ProductoComprado(codigoAgregado, descripcion, cantidad, subtotal));
    }
}

function calcularTotal (subtotal) {
    total = total + subtotal;
}

function armarTotalizador() {
    if (productosComprados.length > 1) {
        var element = document.getElementById("totalizador");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        const tableElement2 = document.getElementById("productosComprados");
        while (tableElement2.firstChild) {
            tableElement2.removeChild(tableElement2.firstChild);
        }

        
        productosComprados.forEach((producto) => {
            let productComprado = document.createElement("tr");
            productComprado.innerHTML = `
                    <td>${producto.cantidadComprada}</td>
                    <td>${producto.descripcionComprada}</td>
                    <td>$ ${producto.subtotal}</td>
                </tr>`;
            tableElement2.appendChild(productComprado);
        });
    
        const mostrarTotal = document.getElementById("totalizador");
        let totalfinal = document.createElement("h2");
        totalfinal.className = "totalCart";
        totalfinal.innerHTML = 
                    `El total de la compra es $${total} y el IVA es $${ivaTotal}
                </h2>
                `;
        mostrarTotal.appendChild(totalfinal);
        
    } else {
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
        totalfinal.className = "totalCart";
        totalfinal.innerHTML = 
                    `El total de la compra es $${total} y el IVA es $${ivaTotal}
                </h2>
                `;
        mostrarTotal.appendChild(totalfinal);
        
    }
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

ingresarCliente();