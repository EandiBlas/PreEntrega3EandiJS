
class Celulares{
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.amount = 1;
    }
}

const samsungs21 = new Celulares (1,"Samsung Galaxy S21",229999,"./assets/img/1.png");
const samsungs20 = new Celulares (2,"Samsung Galaxy S20",193999,"./assets/img/2.png");
const iphone14 = new Celulares (3,"Apple iPhone 14 Pro",689999,"./assets/img/3.png");
const iphone11 = new Celulares (4,"Apple iPhone 11",319999,"./assets/img/4.png");
const huaweip50 = new Celulares (5,"Huawei P50 Pro",629590,"./assets/img/5.png");
const huaweip40 = new Celulares (6,"Huawei P40 Pro",393588,"./assets/img/6.png");
const xiaomi12 = new Celulares (7,"Xiaomi 12T Pro",399990,"./assets/img/7.png");
const xiaomi11 = new Celulares (8,"Xiaomi 11 Pro",206000,"./assets/img/8.png");

const celular = [samsungs21, samsungs20, iphone14, iphone11, huaweip50, huaweip40, xiaomi12, xiaomi11];

console.log(celular);

let carrito = [];
console.log(carrito);

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const shop = document.getElementById("shop");

const showProducts = () => {
    celular.forEach(celulares => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                            <div class="card">
                                <img src = "${celulares.img}" class="card-img-top imgshop" alt = "${celulares.nombre}">
                                <div>
                                    <h5 class="card-title mytitulo">${celulares.nombre}</h5>
                                    <p class="card-text mydescripcion">$${celulares.precio}</p>
                                    <buttton class="btn mx-auto d-block myboton" id="boton${celulares.id}"><i class="fas fa-cart-plus"></i> Añadir al carrito </button>
                                </div>
                            </div>
                        `
        shop.appendChild(card);

        const boton = document.getElementById(`boton${celulares.id}`);
        boton.addEventListener("click", () => {
            addShop(celulares.id);
        })

    });
}
showProducts();

const addShop = (id) => {
    const productInShop = carrito.find(celulares => celulares.id === id);
    if(productInShop){
        productInShop.amount++;
    } else {
        const celulares = celular.find(celulares => celulares.id === id);
        carrito.push(celulares);
    }
    
    calcularTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const containerCarrito = document.getElementById("containerCarrito");
const showCarrito = document.getElementById("showCarrito");

showCarrito.addEventListener("click", () => {
    lookCarrito();
})

const lookCarrito = () => {
    containerCarrito.innerHTML ="";
    carrito.forEach(celulares => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                            <div class="card">
                                <img src = "${celulares.img}" class="card-img-top imgshop" alt = "${celulares.nombre}">
                                <div>
                                    <h5 class="card-title mytitulo">${celulares.nombre}</h5>
                                    <p class="card-text mydescripcion">PRECIO: $${celulares.precio}</p>
                                    <div class="mydivrestysuma">
                                        <buttton class="btn btn-dark btn-rounded restarCantidad"> - </buttton>
                                        <p class="card-text mydescripcion">CANTIDAD: ${celulares.amount}</p>
                                        <buttton class="btn btn-dark btn-rounded sumarCantidad"> + </buttton>
                                    </div>
                                    <buttton class="btn myboton" id="eliminar${celulares.id}"> <i class="fas fa-cart-arrow-down"></i> Eliminar Producto </button>
                                </div>
                            </div>
                        `
        containerCarrito.appendChild(card);

        let restarCantidad = card.querySelector(".restarCantidad")
        restarCantidad.addEventListener("click", () => {
            if(celulares.amount !== 1){
            celulares.amount --;
            }else{
            celulares.amount = 1;
            const indice = carrito.indexOf(celulares);
            carrito.splice(indice, 1);
            }
            lookCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito));
        })

        let sumarCantidad = card.querySelector(".sumarCantidad")
        sumarCantidad.addEventListener("click", () => {
            celulares.amount++;
            lookCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito));
        })

        const boton = document.getElementById(`eliminar${celulares.id}`);
        boton.addEventListener("click", () => {
            eliminarProducto(celulares.id);
        })

    })
    calcularTotal();
}

const eliminarProducto = (id) => {
    const celulares = carrito.find(celulares => celulares.id === id);
        celulares.amount = 1;
    const indice = carrito.indexOf(celulares);
    carrito.splice(indice, 1);
    lookCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(celulares =>{
        totalCompra += celulares.precio * celulares.amount;
    })
    total.innerHTML = `Precio Total: $ ${totalCompra}`;
}

const emptyCarrito = document.getElementById("emptyCarrito");

emptyCarrito.addEventListener("click", () => {
    deletedAllCarrito();
})

const deletedAllCarrito = () => {
    console.log(carrito);
    carrito.forEach(celulares =>{
        celulares.amount = 1;
    })
    carrito = [];
    console.log(carrito);
    lookCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
