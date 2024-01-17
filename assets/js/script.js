// Create Element
let div = document.createElement("div");
let p = document.createElement("p");
let img = document.createElement("img");
let span = document.createElement("span");
let input = document.createElement("input");
p.classList.add("name-product");
span.classList.add("price");
//
// get Element
let cards = document.querySelector(".cards");
let carts = document.querySelector(".carts");
let cartEmpty = document.querySelector(".cart-empty");
let counterOfCarts = document.querySelector(".counter");
let totalOfPrice = document.querySelector(".price");
let myCarts = document.querySelector(".my-carts");
let cartBtn = document.querySelector(".cart");
// array
let arrayOfCarts = [];
let total = 0;
//check if there product in cart
if (localStorage.getItem("carts")) {
  arrayOfCarts = JSON.parse(localStorage.getItem("carts"));
}
getDataFromLocalStorage();

addProductsToPage(products);
// Function to All Products To Page
function addProductsToPage(arrayOfProducts) {
  arrayOfProducts.forEach((product) => {
    // Create Div To Content element of card
    let card = div.cloneNode(false);
    card.classList.add("card");
    let imageDiv = div.cloneNode(false);
    imageDiv.classList.add("image");
    let image = img.cloneNode(false);
    Object.assign(image, {
      src: product.image,
    });
    let titleOfProduct = p.cloneNode(true);
    titleOfProduct.appendChild(document.createTextNode(product.title));
    let priceOfProduct = span.cloneNode(true);
    priceOfProduct.appendChild(document.createTextNode(`$${product.price}.00`));
    let btnAddToCart = input.cloneNode(false);
    Object.assign(btnAddToCart, {
      value: "Add To Cart",
      type: "button",
    });
    // append Element to card Div
    imageDiv.appendChild(image);
    card.appendChild(imageDiv);
    card.appendChild(titleOfProduct);
    card.appendChild(priceOfProduct);
    card.appendChild(btnAddToCart);
    // append Cards To Page
    cards.appendChild(card);
    btnAddToCart.addEventListener("click", (e) => {
      addProductToArrayOfCart(product);
    });
  });
  totalPrice(arrayOfCarts);
}
//add product to array of cart
function addProductToArrayOfCart(product) {
  arrayOfCarts.push(product);
  addProductToCart(arrayOfCarts);
  addCartToLocalStorage(arrayOfCarts);
  totalPrice(arrayOfCarts);
}
// add product to cart in page
function addProductToCart(arrayOfCarts) {
  arrayOfCarts.forEach((product) => {
    if (product) {
      createElementOfCart(arrayOfCarts);
    }
  });
}
//add cart to localStorage
function addCartToLocalStorage(arrayOfCarts) {
  window.localStorage.setItem("carts", JSON.stringify(arrayOfCarts));
}
// to get data of cart from localStorage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("carts");
  if (data) {
    let carts = JSON.parse(data);
    createElementOfCart(carts);
    PrintCountInCart(arrayOfCarts);
  }
}
// to create element of product in cart
function createElementOfCart(arrayOfCarts) {
  carts.innerHTML = "";
  arrayOfCarts.forEach((cart) => {
    let cartDiv = div.cloneNode(false);
    cartDiv.classList.add("my-cart");
    let imageDiv = div.cloneNode(false);
    imageDiv.classList.add("image");
    let image = img.cloneNode(false);
    Object.assign(image, {
      src: cart.image,
    });
    imageDiv.appendChild(image);
    let titleOfProduct = p.cloneNode(true);
    titleOfProduct.appendChild(document.createTextNode(cart.title));
    let priceOfProduct = span.cloneNode(true);
    priceOfProduct.appendChild(document.createTextNode(`$${cart.price}.00`));
    let deleteBtn = span.cloneNode(false);
    Object.assign(deleteBtn, {
      className: "ri-delete-bin-7-fill",
    });
    deleteBtn.classList.add("delete-btn");
    // append Element To Cart Div
    cartDiv.appendChild(imageDiv);
    cartDiv.appendChild(titleOfProduct);
    cartDiv.appendChild(priceOfProduct);
    cartDiv.appendChild(deleteBtn);
    carts.appendChild(cartDiv);
    PrintCountInCart(arrayOfCarts);

    deleteBtn.addEventListener("click", (e) => {
      removeProductFromArray(arrayOfCarts, cart);
      e.target.parentElement.remove();
      PrintCountInCart(arrayOfCarts);
    });

    checkCarts(arrayOfCarts);
  });
}
//print Count Of product In cart
function PrintCountInCart(arrayOfCarts) {
  counterOfCarts.innerHTML = arrayOfCarts.length;
}
// sum total price of product in cart
function totalPrice(arrayOfCarts) {
  total = 0;
  for (product of arrayOfCarts) {
    total += product.price;
  }
  totalOfPrice.innerHTML = `$${total}.00`;
}

function removeProductFromArray(arrayOfCarts, cart) {
  arrayOfCarts.splice(arrayOfCarts.indexOf(cart), 1);
  // update localStorage
  addCartToLocalStorage(arrayOfCarts);
  totalPrice(arrayOfCarts);
  checkCarts(arrayOfCarts);
}

function checkCarts(arrayOfCarts) {
  if (arrayOfCarts.length == 0) {
    cartEmpty.style.display = "flex";
  } else {
    cartEmpty.style.display = "none";
  }
}
cartBtn.addEventListener("click", () => {
  if (myCarts.style.display != "none") {
    myCarts.style.display = "none";
  } else {
    myCarts.style.display = "flex";
  }
});
