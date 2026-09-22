import { updateCartCount } from "./cartCount.mjs";
import { getLocalStorage, loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout_button = document.querySelector("#checkout-button");
if (checkout_button) {
  checkout_button.addEventListener("click", () => {
    window.location.href = "/cart/index.html";
  });
}

const checkout = new CheckoutProcess("so-cart", "#checkout-form");

const form = document.querySelector("#checkout-form");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();

    const fName = document.getElementById("fname").value.trim();
    const lName = document.getElementById("lname").value.trim();

    const street = document.getElementById("street").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const zip = document.getElementById("zip").value.trim();

    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiration = document.getElementById("expiration").value.trim();
    const code = document.getElementById("code").value.trim();

    const cartItems = getLocalStorage("so-cart");
    if (!cartItems || cartItems.length === 0) {
      alertMessage("The cart is empty!");
      window.location.href = "/cart/index.html";
    }

    if (
      !fName ||
      !lName ||
      !street ||
      !city ||
      !state ||
      !zip ||
      !cardNumber ||
      !expiration ||
      !code
    ) {
      alertMessage("Please fill out all required fields.");
      return;
    }
    try {
      if (chk_status) {
        await checkout.checkout(form);
        // const response = await checkout.checkout(form);
        // console.log("Checkout response: ", response);
      }
      // alert("Order placed successfully!");
      localStorage.removeItem("so-cart");
      window.location.href = "/checkout/success.html";
    } catch (error) {
      // console.error("Checkout error: ", error);
      alertMessage("There was a problem placing your order.");
    }
  })
};

async function init() {
  await loadHeaderFooter();
  updateCartCount();

  checkout.init();
  checkout.calculateOrderTotal();
}

init();

// function calculateCheckout() {
//   const cartItems = getLocalStorage("so-cart") || [];

//   const subtotal = document.getElementById("subtotal");
//   const tax = document.getElementById("tax");
//   const shipping = document.getElementById("shipping");
//   const orderTotal = document.getElementById("order-total");

//   let subtotal_val = 0;
//   let shipping_val = 0;
//   let shipping_count = 0;

//   cartItems.forEach((item) => {
//     subtotal_val += item.quantity * item.ListPrice;
//     shipping_count += item.quantity;

//   });
//   if (shipping_count === 1) {
//     shipping_val = 10;
//   } else {
//     shipping_val = 10 + 2 * (shipping_count - 1);
//   }
//   let tax_value = subtotal_val * .06

//   subtotal.innerHTML = new Intl.NumberFormat("de-DE",
//     {
//       style: "currency", currency: "EUR",
//     }).format(Number(subtotal_val.toFixed(2)));
//   tax.innerHTML = new Intl.NumberFormat("de-DE",
//     {
//       style: "currency", currency: "EUR",
//     }).format(Number(tax_value.toFixed(2)));
//   shipping.innerHTML = new Intl.NumberFormat("de-DE",
//     {
//       style: "currency", currency: "EUR",
//     }).format(Number(shipping_val.toFixed(2)));
//   orderTotal.innerHTML = new Intl.NumberFormat("de-DE",
//     {
//       style: "currency", currency: "EUR",
//     }).format(Number((tax_value + subtotal_val + shipping_val).toFixed(2)));

// };
