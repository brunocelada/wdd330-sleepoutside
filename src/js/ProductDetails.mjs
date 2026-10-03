import {
  getLocalStorage,
  setLocalStorage,
  cartSuperscript,
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    const product = await this.dataSource.findProductById(this.productId);

    this.product = product;

    this.renderProductDetails(product);
    this.handleBrandCrumbs();

    document
      .getElementById("addToCart")
      .addEventListener("click", () => this.addToCart(product));
  }

  addToCart(product) {
    const productList = getLocalStorage("so-cart") || [];

    const isExist = productList.find((item) => item.Id === product.Id);

    if (isExist) {
      isExist.FinalPrice += product.FinalPrice;
      isExist.Qtd += 1;
    } else {
      product.Qtd = 1;
      productList.push(product);
    }

    setLocalStorage("so-cart", productList);

    cartSuperscript();
  }

  handleBrandCrumbs() {
    const breadcrumbsElement = document.querySelector("#breadcrumbs");

    breadcrumbsElement.innerHTML = `
      <span class="path">${this.product.Category}</span>
    `;
  }

  renderProductDetails(product) {
    const detailsElement = document.querySelector(".product-detail");

    /*
     * Calculate the discount.
     *
     * SuggestedRetailPrice = original price
     * ListPrice = current selling price
     */
    const originalPrice = Number(product.SuggestedRetailPrice);
    const currentPrice = Number(product.ListPrice);

    const hasDiscount =
      originalPrice > 0 &&
      currentPrice > 0 &&
      currentPrice < originalPrice;

    const discountPercentage = hasDiscount
      ? Math.round(
          ((originalPrice - currentPrice) / originalPrice) * 100
        )
      : 0;

    /*
     * Price section
     */
    const priceMarkup = hasDiscount
      ? `
          <p class="product-card__price product-detail__price">
            <span class="product-card__original-price">
              $${originalPrice.toFixed(2)}
            </span>

            <span class="product-card__discount-price">
              $${currentPrice.toFixed(2)}
            </span>
          </p>
        `
      : `
          <p class="product-card__price product-detail__price">
            $${currentPrice.toFixed(2)}
          </p>
        `;

    /*
     * Discount flag
     */
    const discountFlagMarkup = hasDiscount
      ? `
          <span class="discount-flag">
            Save ${discountPercentage}%
          </span>
        `
      : "";

    detailsElement.innerHTML = `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">
        ${product.NameWithoutBrand}
      </h2>

      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.Name}"
      />

      ${priceMarkup}

      ${discountFlagMarkup}

      <p class="product__color">
        ${product.Colors[0].ColorName}
      </p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">
          Add to Cart
        </button>
      </div>
    `;
  }
}