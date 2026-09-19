import CategoryData from "./CategoryData.mjs";
import CategoryList from "./CategoryList.mjs";
import { updateCartCount } from "./cartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new CategoryData();

const element = document.querySelector(".category-list");

const categoryList = new CategoryList(dataSource, element);

async function init() {
    await loadHeaderFooter();
    await categoryList.init();
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