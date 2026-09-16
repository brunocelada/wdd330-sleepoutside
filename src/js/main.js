import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

async function init() {
  await loadHeaderFooter();
  updateCartCount();
}

init();


// Customizable home-page alert
const siteAlert = document.querySelector("#site-alert");
const siteAlertClose = document.querySelector("#site-alert-close");

if (siteAlert && siteAlertClose) {
  siteAlertClose.addEventListener("click", () => {
    siteAlert.hidden = true;
  });
}