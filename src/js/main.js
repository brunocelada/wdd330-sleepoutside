import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

import ProductList from "./ProductList.mjs";

const element = document.querySelector(".product-list");
const listing = new ProductList("tents", dataSource, element);
listing.init();