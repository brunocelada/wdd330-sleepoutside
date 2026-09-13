import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// LOG TO SEE THE OBJECT RETURNED FROM THE DATASOURCE.
// console.log(dataSource.findProductById(productId));

// NO NEEDED ANY MORE:
// function addProductToCart(product) {
//   // 1. Get current cart items from localStorage, or default to an empty array
//   let cartItems = getLocalStorage("so-cart") || [];

//   // 2. Ensure it's treated as an array
//   if (!Array.isArray(cartItems)) {
//     cartItems = [cartItems];
//   }

//   // 3. Push the new product into the array
//   cartItems.push(product);

//   // 4. Save the updated array back to localStorage
//   setLocalStorage("so-cart", cartItems);
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
