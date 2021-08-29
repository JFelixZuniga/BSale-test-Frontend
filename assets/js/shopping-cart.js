/**************** Shopping Cart ****************/
let carrito = [];
const tbody = document.querySelector(".tbody");
const btnPagar = document.querySelector(".btn-pagar");

document.addEventListener("click", (event) => {
  if (event.target && event.target.className.includes("add-to-cart")) {
    addToCarritoItem(event);
  } else if (event.target && event.target.className.includes("delete")) {
    removeItemCarrito(event);
  }
});

// Creamos un objeto a partir del producto selecionado al agregarlo al carro
const addToCarritoItem = (event) => {
  const button = event.target;
  // Obtenemos el contenedor padre más cercano que contenga la clase "card", para luego construir el objeto con su contenido
  const item = button.closest(".card");

  const itemTitle = item.querySelector(".title").textContent;
  const itemPrice = item.querySelector(".price").textContent.split("$")[1];
  const itemImg = item.querySelector(".pic-1").src;
  // Creamos un objeto con el contenido del producto seleccionado
  const newItem = {
    title: itemTitle,
    price: itemPrice,
    img: itemImg,
    cantidad: 1,
  };

  // Agregamos el nuevo producto (objeto creado)
  addItemCarrito(newItem);
};

const addItemCarrito = (newItem) => {
  const alert = document.querySelector(".alert");

  // Muestra una alerta informando que el producto fue agregado con éxito
  setTimeout(function () {
    alert.classList.add("hide");
  }, 1000);
  alert.classList.remove("hide");

  // Obtenemos un arreglo con los elementos input hijos
  const InputElemnto = tbody.getElementsByClassName("input-elemento");
  // Recorremos el arreglo
  for (let i = 0; i < carrito.length; i++) {
    // Si existe el nuevo objeto agregado al carro en el arreglo carrito, le sumamos 1 en cantidad
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      const inputValue = InputElemnto[i];
      inputValue.value++;
      CarritoTotal();
      return null;
    }
  }
  // Agregamos el objeto (producto selecionado) al arreglo carrito
  carrito.push(newItem);
  // Renderizamos el carrito con el nuevo objeto agregado al arreglo
  renderCarrito();
};

// Función que crea y renderiza el carrito
const renderCarrito = () => {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("ItemCarrito");
    tr.innerHTML += `
      <td>
        <img src="${item.img}" alt="bebida" width="50" />
      </td>
      <td class="title">${item.title}</td>
      <td>${item.price}</td>
      <td>
      <input
        type="number"
        min="1"
        value="${item.cantidad}"
        class="w-50 pl-2 input-elemento"
      />
      </td>
      <td>
      <button class="delete btn btn-warning">ELIMINAR</button>
      </td>
    `;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
    tr.querySelector(".input-elemento").addEventListener(
      "change",
      sumaCantidad
    );
  });
  CarritoTotal();
};

// Función que tiene por finalidad detemrinar el total a pagar de acuerdo a los productos agregados al carro
const CarritoTotal = () => {
  let Total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  // Recorremos el arreglo carrito para obtener el precio y la cantidad de productos
  carrito.forEach((item) => {
    const precio = Number(item.price);
    Total = Total + precio * item.cantidad;
  });

  // Insertamos el total en el html
  itemCartTotal.innerHTML = `Total a Pagar $${Total.toLocaleString("de-DE")}`;
  addLocalStorage();
};

// Para eliminar un objeto del arreglo carrito, recorremos el arreglo hasta encontrar el atributo "title" del objeto a eliminar y mediante el método splice eliminamos el elemento conforme al índice dado en el recorrido del arreglo
const removeItemCarrito = (e) => {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  // Al remover el tr seleccionado volvemos a llamar a la función CarritoTal para actualizar el total
  tr.remove();
  CarritoTotal();
};

const sumaCantidad = (e) => {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      // Validamos que el input de cantidad de productos no sea inferior a 1
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      // Actualizamos la cantidad de productos según el valor del input
      item.cantidad = sumaInput.value;
      CarritoTotal();
    }
  });
};

// Al presionar el boton de pagar, escondemos el modal, mostramos un alert, limpiamos el local storage y recargamos la página principal
btnPagar.addEventListener("click", () => {
  $("#productsModal").modal("hide");
  localStorage.clear();
  alert("Compra efectuada con éxito. Por favor revise su correo.");
  location.reload();
});

// Agrega el arreglo carrito al local storage
const addLocalStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
