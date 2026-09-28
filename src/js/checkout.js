import { updateCartCount } from "./cartCount.mjs";
import { loadHeaderFooter, alertMessage, getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

async function init() {
  await loadHeaderFooter();
  updateCartCount();

  const form = document.querySelector("#checkout-form");
  const checkout = new CheckoutProcess("so-cart");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!getLocalStorage("so-cart")?.length) {
      alertMessage("Your cart is empty. Add an item before placing an order.");
      return;
    }

    try {
      await checkout.checkout(form);
      window.location.assign("./success.html");
    } catch (error) {
      const message =
        error?.message ??
        "We could not place your order. Please check your information and try again.";
      alertMessage(message);
    }
  });
}

init();
