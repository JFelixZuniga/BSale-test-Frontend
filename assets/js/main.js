const URL_API = "https://bsale-store-test.herokuapp.com";
// const URL_API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  const dataAllProducts = await getAllProducts();
  await paintProductCards(dataAllProducts);

  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
});

const getAllProductsMenu = async () => {
  try {
    const dataAllProducts = await getAllProducts();
    await paintProductCards(dataAllProducts);
  } catch (error) {
    console.log("Error: ", error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await fetch(`${URL_API}/Api/Products/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

const paintProductCards = async (dataProducts) => {
  $(".product-card").remove();

  const contenedor = document.querySelector("#contenedor_products");

  dataProducts.productos.forEach(({ name, url_image, price, discount }) => {
    const divCard = document.createElement("div");
    divCard.classList.add(
      "col-lg-3",
      "col-md-4",
      "col-sm-6",
      "mb-4",
      "product-card"
    );
    divCard.innerHTML += `
        <div class="card h-100">
          <div class="product-grid h-100">
            <div class="product-image">
              <a href="#">
                  <img class="pic-1" src="${
                    url_image == "" || url_image == null
                      ? `https://www.cuestalibros.com/content/images/thumbs/default-image_550.png`
                      : url_image
                  }" alt="Bebida">
              </a>
              <ul class="social">
                  <li><a href="" data-tip="Vista rápida"><i class="fa fa-search"></i></a></li>
                  <li><a href="" data-tip="Agregar a la lista"><i class="fa fa-shopping-bag"></i></a></li>
                  <li><a href="" data-tip="Agregar al carro"><i class="fa fa-shopping-cart"></i></a></li>
              </ul>
              ${
                discount > 0
                  ? `<span class="product-new-label">Oferta</span><span class="product-discount-label">${discount}%</span>`
                  : ""
              }
            </div>
            <div class="product-content">
              <h3 class="title"><a href="#">${name}</a></h3>
              ${
                discount > 0
                  ? `<div>
                    <span class="price">$${((100 - discount) * price) / 100}
                    </span>
                    <span class="ex-price">$${price}</span>
                  </div>`
                  : `<div class="price">$${price}</div>`
              }
                <button class="add-to-cart btn btn-outline-warning">+ Agregar</button>
            </div>
          </div>
        </div>
      `;
    contenedor.appendChild(divCard);
  });
};

const searchProduct = async () => {
  let inputSearch = document.querySelector("#input_search").value;
  try {
    const response = await fetch(`${URL_API}/Api/Products/${inputSearch}`);
    const productsFound = await response.json();
    await paintProductCards(productsFound);
  } catch (error) {
    console.log("Error: ", error);
  }
};

const getCategory = async (category) => {
  try {
    const response = await fetch(
      `${URL_API}/Api/Products/Category/${category}`
    );
    const categoryFound = await response.json();
    await paintProductCards(categoryFound);
  } catch (error) {
    console.log("Error: ", error);
  }
};

// /**************** Shopping Cart ****************/
// let carrito = [];
// const tbody = document.querySelector(".tbody");
// const btnPagar = document.querySelector(".btn-pagar");

// document.addEventListener("click", (event) => {
//   if (event.target && event.target.className.includes("add-to-cart")) {
//     addToCarritoItem(event);
//   } else if (event.target && event.target.className.includes("delete")) {
//     removeItemCarrito(event);
//   }
// });

// const addToCarritoItem = (event) => {
//   const button = event.target;
//   const item = button.closest(".card");

//   const itemTitle = item.querySelector(".title").textContent;
//   const itemPrice = item.querySelector(".price").textContent.split("$")[1];
//   const itemImg = item.querySelector(".pic-1").src;

//   const newItem = {
//     title: itemTitle,
//     price: itemPrice,
//     img: itemImg,
//     cantidad: 1,
//   };

//   addItemCarrito(newItem);
// };

// const addItemCarrito = (newItem) => {
//   const alert = document.querySelector(".alert");

//   setTimeout(function () {
//     alert.classList.add("hide");
//   }, 1000);
//   alert.classList.remove("hide");

//   const InputElemnto = tbody.getElementsByClassName("input-elemento");
//   for (let i = 0; i < carrito.length; i++) {
//     if (carrito[i].title.trim() === newItem.title.trim()) {
//       carrito[i].cantidad++;
//       const inputValue = InputElemnto[i];
//       inputValue.value++;
//       CarritoTotal();
//       return null;
//     }
//   }

//   carrito.push(newItem);

//   renderCarrito();
// };

// const renderCarrito = () => {
//   tbody.innerHTML = "";
//   carrito.map((item) => {
//     const tr = document.createElement("tr");
//     tr.classList.add("ItemCarrito");
//     tr.innerHTML += `
//       <td>
//         <img src="${item.img}" alt="bebida" width="50" />
//       </td>
//       <td class="title">${item.title}</td>
//       <td>${item.price}</td>
//       <td>
//       <input
//         type="number"
//         min="1"
//         value="${item.cantidad}"
//         class="w-50 pl-2 input-elemento"
//       />
//       </td>
//       <td>
//       <button class="delete btn btn-warning">ELIMINAR</button>
//       </td>
//     `;
//     tbody.append(tr);

//     tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
//     tr.querySelector(".input-elemento").addEventListener(
//       "change",
//       sumaCantidad
//     );
//   });
//   CarritoTotal();
// };

// const CarritoTotal = () => {
//   let Total = 0;
//   const itemCartTotal = document.querySelector(".itemCartTotal");
//   carrito.forEach((item) => {
//     const precio = Number(item.price);
//     Total = Total + precio * item.cantidad;
//   });

//   itemCartTotal.innerHTML = `Total a Pagar $${Total.toLocaleString("de-DE")}`;
//   addLocalStorage();
// };

// const removeItemCarrito = (e) => {
//   const buttonDelete = e.target;
//   const tr = buttonDelete.closest(".ItemCarrito");
//   const title = tr.querySelector(".title").textContent;
//   for (let i = 0; i < carrito.length; i++) {
//     if (carrito[i].title.trim() === title.trim()) {
//       carrito.splice(i, 1);
//     }
//   }

//   tr.remove();
//   CarritoTotal();
// };

// const sumaCantidad = (e) => {
//   const sumaInput = e.target;
//   const tr = sumaInput.closest(".ItemCarrito");
//   const title = tr.querySelector(".title").textContent;
//   carrito.forEach((item) => {
//     if (item.title.trim() === title) {
//       sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
//       item.cantidad = sumaInput.value;
//       CarritoTotal();
//     }
//   });
// };

// btnPagar.addEventListener("click", () => {
//   $("#productsModal").modal("hide");
//   localStorage.clear();
//   alert("Compra efectuada con éxito. Por favor revise su correo.");
//   location.reload();
// });

// const addLocalStorage = () => {
//   localStorage.setItem("carrito", JSON.stringify(carrito));
// };
