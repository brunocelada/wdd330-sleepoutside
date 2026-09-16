import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cartCount.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const category = getParam("category");

const dataSource = new ProductData("category");

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

async function init() {
    await productList.init();
    await loadHeaderFooter();
    updateCartCount();
}

init();
