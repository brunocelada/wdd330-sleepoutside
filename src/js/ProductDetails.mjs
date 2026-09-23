import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartCount.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];

    if (!Array.isArray(cartItems)) {
      cartItems = [cartItems];
    }

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    updateCartCount();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;

  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;

  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;

  displayDiscountFlag(product);
}

function displayDiscountFlag(product) {
  const priceElement = document.getElementById("productPrice");

  if (
    !product.SuggestedRetailPrice ||
    !product.FinalPrice ||
    product.FinalPrice >= product.SuggestedRetailPrice
  ) {
    return;
  }

  const discountPercentage = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
      100,
  );

  const discountFlag = document.createElement("span");

  discountFlag.classList.add("discount-indicator");
  discountFlag.textContent = `${discountPercentage}% OFF`;

  priceElement.insertAdjacentElement("afterend", discountFlag);
}