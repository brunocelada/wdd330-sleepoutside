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

    // Calculate total quantity across items (accounting for duplicate item increments)
    const totalQuantity = cartItems.reduce(
        (total, item) => total + (item.quantity || 1), 0
    );

    cartCount.textContent = totalQuantity;
};