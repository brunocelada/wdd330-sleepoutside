import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./cartCount.mjs";

const query = getParam("query");

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

const productList = new ProductList(query, dataSource, element);

async function init() {
  await loadHeaderFooter();
  await productList.init();
  updateCartCount();
}

init();