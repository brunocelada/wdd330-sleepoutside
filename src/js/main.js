import CategoryData from "./CategoryData.mjs";
import CategoryList from "./CategoryList.mjs";
import { updateCartCount } from "./cartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

// Initialize site-wide alert banner
const alert = new Alert();
alert.init();

const dataSource = new CategoryData();
const element = document.querySelector(".category-list");

const categoryList = new CategoryList(dataSource, element);

async function init() {
    await loadHeaderFooter();
    await categoryList.init();
    updateCartCount();
}

init();