const URL_API = "https://bsale-store-test.herokuapp.com";
// const URL_API = "http://localhost:3000";

// Con el evento DOMContentLoaded, una vez que el HTML está completamente cargado y el árbol DOM está construido se ejecuta la función getAllProducts para traer la data y posteriormente renderizarla
document.addEventListener("DOMContentLoaded", async () => {
  const { products } = await getAllProducts();
  await paintProductCards(products);

  // Leemos los datos de localStorage, en caso de existir se le asigna al arrelo carrito
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
});

const getAllProductsMenu = async () => {
  try {
    const { products } = await getAllProducts();
    await paintProductCards(products);
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Petición fetch para traer toda la data de "productos" de la base de datos
const getAllProducts = async () => {
  try {
    const response = await fetch(`${URL_API}/Api/Products/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Función que tiene por objeto crear y pintar en el DOM cada tarjeta de los productos obtenidos de la base de datos
const paintProductCards = async (dataProducts) => {
  $(".product-card").remove();

  const contenedor = document.querySelector("#contenedor_products");

  dataProducts.forEach(({ name, url_image, price, discount }) => {
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
                    // Aplciamos operadores ternarios para determinar que imagen pintar dependiendo sí existe el recurso en la base de datos o no. Todo esto tiene la finalidad de entregar una mejor experiencia de usuario.
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

    // Insertamos el contenido en el contenedor
    contenedor.appendChild(divCard);
  });
};

// Función para buscar productos en la base de datos. Opera con el evento onkeyup, significa que a medida que el usuario teclea (al soltar la tecla específicamente) la busqueda se va realizando.
const searchProduct = async () => {
  let inputSearch = document.querySelector("#input_search").value;
  try {
    const response = await fetch(`${URL_API}/Api/Products/${inputSearch}`);
    const { products } = await response.json();
    await paintProductCards(products);
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Función encargada de de traer los datos de la categpria seleccionada en el menú para luego pintar los datos en pantalla.
const getCategory = async (category) => {
  try {
    const response = await fetch(`${URL_API}/Api/Categories/${category}`);
    const { Products } = await response.json();
    await paintProductCards(Products);
  } catch (error) {
    console.log("Error: ", error);
  }
};
