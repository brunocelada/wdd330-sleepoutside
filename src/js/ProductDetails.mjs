import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // 1. Fetch the product details using the data source
        this.product = await this.dataSource.findProductById(this.productId);

        // 2. Render the product details to the page
        this.renderProductDetails();

        // 3. Add event listener to the "Add to Cart" button with .bind(this)
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
        // Save the current product to localStorage
        setLocalStorage("so-cart", this.product);
    }

    renderProductDetails() {
        // Inject the retrieved product information into the HTML DOM template
        document.querySelector("main").innerHTML = `
      <section class="product-detail"> 
        <h3>${this.product.Brand.Name}</h3>
        <h2>${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.Name}"
        />
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
    }
}