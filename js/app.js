// import {stockProductos , stockProductos2} from './data.js';

// import data from './data.json' assert { type: 'json' };
// console.log(data);

const stockProductos2 = [
  {
    id: 1,
    nombre: "Camisa Larga Sky",
    cantidad: 1,
    precio: "12000",
    img: "img/products/n1.jpg",
  },
  {
    id: 2,
    nombre: "Camisa Larga Cuadrille",
    cantidad: 1,
    precio: "13400",
    img: "img/products/n2.jpg",
  },
  {
    id: 3,
    nombre: "Camisa Larga White",
    cantidad: 1,
    precio: "12600",
    img: "img/products/n3.jpg",
  },
  {
    id: 4,
    nombre: "Camisa Corta Camo",
    cantidad: 1,
    precio: "12980",
    img: "img/products/n4.jpg",
  },
  {
    id: 5,
    nombre: "Camisa Larga Mezclilla",
    cantidad: 1,
    precio: "17800",
    img: "img/products/n5.jpg",
  },
  {
    id: 6,
    nombre: "Short Classic",
    cantidad: 1,
    precio: "15700",
    img: "img/products/n6.jpg",
  },
  {
    id: 7,
    nombre: "Camisa Larga Beige",
    cantidad: 1,
    precio: "12100",
    img: "img/products/n7.jpg",
  },
  {
    id: 8,
    nombre: "Camisa Corta Black",
    cantidad: 1,
    precio: "11600",
    img: "img/products/n8.jpg",
  },
];
const stockProductos = [
  {
    id: 11,
    nombre: "Camisa Astronaut",
    cantidad: 1,
    precio: "12000",
    img: "img/products/f1.jpg",
  },
  {
    id: 12,
    nombre: "Camisa Hojas",
    cantidad: 1,
    precio: "13400",
    img: "img/products/f2.jpg",
  },
  {
    id: 13,
    nombre: "Camisa Hojas",
    cantidad: 1,
    precio: "12600",
    img: "img/products/f3.jpg",
  },
  {
    id: 14,
    nombre: "Camisa Petalos",
    cantidad: 1,
    precio: "12980",
    img: "img/products/f4.jpg",
  },
  {
    id: 15,
    nombre: "Camisa Hilo de Flores",
    cantidad: 1,
    precio: "17800",
    img: "img/products/f5.jpg",
  },
  {
    id: 16,
    nombre: "Camisa Classic",
    cantidad: 1,
    precio: "15700",
    img: "img/products/f6.jpg",
  },
  {
    id: 17,
    nombre: "Pantalones Flores",
    cantidad: 1,
    precio: "12100",
    img: "img/products/f7.jpg",
  },
  {
    id: 18,
    nombre: "Blusa Flores",
    cantidad: 1,
    precio: "11600",
    img: "img/products/f8.jpg",
  },
];

let carrito = [];

const contenedor = document.querySelector("#contenedor");
const contenedor2 = document.querySelector("#contenedor2");
const contenedor3 = document.querySelector("#contenedor3");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector("#procesar-pago");

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();

  document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
  formulario.addEventListener("submit", enviarCompra);
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  let _value = `
  <div class="pro">
  <img  src="${img}" alt="Image product" onclick="window.location.href='sproduct.html';">
  <div class="des">
      <span>back.tc</span>
      <h5>${nombre}</h5>
      <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
      </div>
      <h4>${precio}</h4>
      <a ><i class="fal fa-shopping-cart cart" onclick="agregarProducto(${id})"></i></a>
  </div>
</div>
  `;
  if (contenedor) {
    contenedor.innerHTML += _value;
  }
  if (contenedor3) {
    contenedor3.innerHTML += _value;
  }
});

stockProductos2.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  let _value = `
  <div class="pro">
  <img  src="${img}" alt="Image product" onclick="window.location.href='sproduct.html';">
  <div class="des">
      <span>back.tc</span>
      <h5>${nombre}</h5>
      <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
      </div>
      <h4>${precio}</h4>
      <a ><i class="fal fa-shopping-cart cart" onclick="agregarProducto(${id})"></i></a>
  </div>
</div>
  `;
  if (contenedor2) {
    contenedor2.innerHTML += _value;
  }
  if (contenedor3) {
    contenedor3.innerHTML += _value;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some((prod) => prod.id === id);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    if (item){
      carrito.push(item);
    }
    let item2 = stockProductos2.find((prod) => prod.id === id);
    if (item2){
      carrito.push(item2);
    }
  }

  Swal.fire({
    title: "Información",
    text: "Producto agregado al carrito",
    icon: "success",
    timer: 3000,
    timerProgressBar: true,
  });
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `

      <div class="modal-contenedor">
        <div>
        <img  class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  Swal.fire({
    title: "Información",
    text: "Producto Eliminado",
    icon: "info",
  });
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img style="height: 7rem; width: 7rem;" class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e) {
  e.preventDefault();
  const cliente = document.querySelector("#cliente").value;
  const email = document.querySelector("#correo").value;

  if (email === "" || cliente == "") {
    Swal.fire({
      title: "¡Debes completar todos tus datos!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    const btn = document.getElementById("button");

    // document.getElementById('procesar-pago')
    //  .addEventListener('submit', function(event) {
    //    event.preventDefault();

    btn.value = "Enviando...";

    const serviceID = "default_service";
    const templateID = "template_qxwi0jn";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Finalizar compra";
        alert("Correo enviado!");
      },
      (err) => {
        btn.value = "Finalizar compra";
        alert(JSON.stringify(err));
      }
    );

    const spinner = document.querySelector("#spinner");
    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("d-none");
      formulario.reset();

      const alertExito = document.createElement("p");
      alertExito.classList.add(
        "alert",
        "alerta",
        "d-block",
        "text-center",
        "col-12",
        "mt-2",
        "alert-success"
      );
      alertExito.textContent = "Compra realizada correctamente";
      formulario.appendChild(alertExito);

      setTimeout(() => {
        alertExito.remove();
      }, 3000);
    }, 3000);
  }
  localStorage.clear();
}
