import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cartCount.mjs";

import Alert from "./Alert.js";

// Load alerts when the page loads
const alert = new Alert();
alert.init();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

