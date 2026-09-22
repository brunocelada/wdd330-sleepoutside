import { updateCartCount } from "./cartCount.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", function (event) {
  const fName = document.getElementById("fname").value;
  const lName = document.getElementById("lname").value;

  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;

  const card_num = document.getElementById("card_num").value;
  const expiration = document.getElementById("expiration").value;
  const cvv = document.getElementById("cvv").value;

  if (!fName || !lName || !street || !city || !state || !zip || !card_num || !expiration || !cvv) {
    event.preventDefault();
    alert("Please fill out all required fields.");
  }
  // To prevent user's manipulation.
  calculateCheckout();
});

function calculateCheckout() {
  const cartItems = getLocalStorage("so-cart") || [];

  const subtotal = document.getElementById("subtotal");
  const tax = document.getElementById("tax");
  const shipping = document.getElementById("shipping");
  const orderTotal = document.getElementById("order-total");

  let subtotal_val = 0;
  let shipping_val = 0;
  let shipping_count = 0;

  cartItems.forEach((item) => {
    subtotal_val += item.quantity * item.ListPrice;
    shipping_count += item.quantity;

  });
  if (shipping_count === 1) {
    shipping_val = 10;
  } else {
    shipping_val = 10 + 2 * (shipping_count - 1);
  }
  let tax_value = subtotal_val * .06

  subtotal.innerHTML = new Intl.NumberFormat("de-DE",
    {
      style: "currency", currency: "EUR",
    }).format(Number(subtotal_val.toFixed(2)));
  tax.innerHTML = new Intl.NumberFormat("de-DE",
    {
      style: "currency", currency: "EUR",
    }).format(Number(tax_value.toFixed(2)));
  shipping.innerHTML = new Intl.NumberFormat("de-DE",
    {
      style: "currency", currency: "EUR",
    }).format(Number(shipping_val.toFixed(2)));
  orderTotal.innerHTML = new Intl.NumberFormat("de-DE",
    {
      style: "currency", currency: "EUR",
    }).format(Number((tax_value + subtotal_val + shipping_val).toFixed(2)));

};

async function init() {
  await loadHeaderFooter();
  updateCartCount();
  calculateCheckout();
};

init();

const checkout_button = document.querySelector("#checkout-button");
checkout_button.addEventListener("click", () => {
  window.location.href = "/cart/index.html";
});

