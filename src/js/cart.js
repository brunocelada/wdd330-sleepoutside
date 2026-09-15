import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartCount.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const listElement = document.querySelector(".product-list");

  // BC- Check if the cart is empty and display the warning.
  if (!cartItems || cartItems.length === 0) {
    listElement.innerHTML = "<p>The cart is empty</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  listElement.innerHTML = htmlItems.join("");

  addRemoveListeners();
  updateCartCount();
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
  <span class="remove-item" data-id="${item.Id}">Remove &#10006;</span>
</li>`;
  // Added span X remover item.

  return newItem;
}

//finding Xs in cart, identifying item clicked, remove from local storage, cart refresh (does not remove duplicates one at a time) -KD
// BC- When an item is removed, all items with the same ID are deleted. I fixed that error. Now, remove the first instance of the item.
function addRemoveListeners() {
  const removeItems = document.querySelectorAll(".remove-item");

  removeItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const id = event.target.dataset.id;

      const cartItems = getLocalStorage("so-cart");

      // BC- here are my changes.
      const index = cartItems.findIndex((cartItem) => cartItem.Id === id);
      if (index !== -1) {
        cartItems.splice(index, 1);
      }

      setLocalStorage("so-cart", cartItems);
      renderCartContents();
      updateCartCount();
    });
  });
}

renderCartContents();
updateCartCount();
