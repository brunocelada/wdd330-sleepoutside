import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";

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
  addQuantityListeners();
  updateCartCount();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}">
            <picture>
                <source
                    media="(min-width: 500px)"
                    srcset="${item.Images.PrimaryMedium}"
                />
                <img
                    src="${item.Images.PrimarySmall}"
                    alt="Image of ${item.Name}"
                />
            </picture>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">
  qty: 
    <input
      type="number"
      class="quantity-input"
      data-id="${item.Id}"
      value="${item.quantity || 1}"
      min="1"
    />
  </p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">Remove &#10006;</span>
</li>`;
  // Added span X remover item.
  //changed qty from hard coded qty: 1 to template literal qty: ${item.quantity || 1} to increase qty in cart -kd
  //then changed the whole qty p tag to accept user input to change qty display
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

//update quantity in local storage -kd
function addQuantityListeners() {
  const quantityInputs = document.querySelectorAll(".quantity-input");

  quantityInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const id = event.target.dataset.id;
      const quantity = Number(event.target.value);

      const cartItems = getLocalStorage("so-cart");
      const product = cartItems.find((item) => item.Id === id);

      if (product) {
        product.quantity = quantity;
      }
      setLocalStorage("so-cart", cartItems);
      updateCartCount();

      //console.log("Product ID:", id);
      //console.log("Quantity:", quantity);
    });
  });
}

async function init() {
  await loadHeaderFooter();
  renderCartContents();
  updateCartCount();
}

init();