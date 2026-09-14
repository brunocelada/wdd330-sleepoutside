import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

import Alert from "./Alert.js";

// Initialize the alerts component
const alert = new Alert();
alert.init();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("tents", dataSource, element);
listing.init();