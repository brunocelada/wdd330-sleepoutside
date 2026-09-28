import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./cartCount.mjs";

async function init() {
  await loadHeaderFooter();
  updateCartCount();
}

init();
