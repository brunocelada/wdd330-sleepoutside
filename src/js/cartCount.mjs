import { getLocalStorage } from "./utils.mjs";

// BC- Function to update the cart count span. If the span doesn't exists, this creates it.
export function updateCartCount() {
    const cartItems = getLocalStorage("so-cart") || [];

    const cart = document.querySelector(".cart a");
    if (!cart) return;

    let cartCount = cart.querySelector(".cart-count");

    if (!cartCount) {
        cartCount = document.createElement("span");
        cartCount.classList.add("cart-count");
        cart.appendChild(cartCount);
    }

    cartCount.textContent = cartItems.length;
};