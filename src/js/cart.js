import { getLocalStorage, setLocalStorage } from "./utils.mjs";
console.log("cart.js loaded");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addRemoveListeners();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">X</span>
  </li>`;

  return newItem;
}
//finding Xs in cart, identifying item clicked, remove from local storage, cart refresh (does not remove duplicates one at a time) -KD
function addRemoveListeners() {
  const removeItems = document.querySelectorAll(".remove-item");
  //console.log(removeItems);
  removeItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const id = event.target.dataset.id;

      const cartItems = getLocalStorage("so-cart");

      const updatedCart = cartItems.filter((item) => item.Id !== id);
      setLocalStorage("so-cart", updatedCart);
      renderCartContents();
      //console.log(id);
      //console.log(cartItems);
      //console.log(updatedCart);
    });
  });
}

renderCartContents();
