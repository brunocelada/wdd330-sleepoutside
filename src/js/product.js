import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { updateCartCount } from "./cartCount.mjs";

const dataSource = new ProductData();
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);

async function init() {
    await loadHeaderFooter();
    await product.init();
    updateCartCount();
}

init();