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

const addToCarritoItem = (event) => {
  const button = event.target;
  const item = button.closest(".card");

  const itemTitle = item.querySelector(".title").textContent;
  const itemPrice = item.querySelector(".price").textContent.split("$")[1];
  const itemImg = item.querySelector(".pic-1").src;

  const newItem = {
    title: itemTitle,
    price: itemPrice,
    img: itemImg,
    cantidad: 1,
  };

  addItemCarrito(newItem);
};

const addItemCarrito = (newItem) => {
  const alert = document.querySelector(".alert");

  setTimeout(function () {
    alert.classList.add("hide");
  }, 1000);
  alert.classList.remove("hide");

  const InputElemnto = tbody.getElementsByClassName("input-elemento");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      const inputValue = InputElemnto[i];
      inputValue.value++;
      CarritoTotal();
      return null;
    }
  }

  carrito.push(newItem);

  renderCarrito();
};

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

const CarritoTotal = () => {
  let Total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  carrito.forEach((item) => {
    const precio = Number(item.price);
    Total = Total + precio * item.cantidad;
  });

  itemCartTotal.innerHTML = `Total a Pagar $${Total.toLocaleString("de-DE")}`;
  addLocalStorage();
};

const removeItemCarrito = (e) => {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  tr.remove();
  CarritoTotal();
};

const sumaCantidad = (e) => {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
    }
  });
};

btnPagar.addEventListener("click", () => {
  $("#productsModal").modal("hide");
  localStorage.clear();
  alert("Compra efectuada con éxito. Por favor revise su correo.");
  location.reload();
});

const addLocalStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
