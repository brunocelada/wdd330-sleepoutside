import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise!
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        // once the html is rendered add a listener to Add to Cart button
        // Notice the .bind(this). This is because in a callback function, "this" will refer to the event target, not our class instance!
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
    }

    renderProductDetails() {
        document.querySelector("h2.card__brand").innerText = this.product.Brand;
        document.querySelector("h3.card__name").innerText =
            this.product.NameWithoutBrand;
        document.querySelector(".product-detail__img").src =
            this.product.Image;
        document.querySelector(".product-detail__img").alt =
            this.product.Name;
        document.querySelector(".product__price").innerText =
            "$" + this.product.FinalPrice;
        document.querySelector(".product__color").innerText =
            this.product.Colors[0].ColorName;
        document.querySelector(".product__description").innerHTML =
            this.product.DescriptionHtmlSimple;
        document.querySelector("#addToCart").dataset.id = this.product.Id;
    }
}