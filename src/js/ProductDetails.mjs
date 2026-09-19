import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartCount.mjs";
import { updateBreadcrumb } from "./breadcrumb.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // === DETAILS OF init() ===

        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        updateBreadcrumb(this.product.Category);
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }
    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || [];

        if (!Array.isArray(cartItems)) {
            cartItems = [cartItems];
        }
        //find existing duplicate items in cart -kd
        const existingItem = cartItems.find(
            (item) => item.Id === this.product.Id
        );

        //if item is already in cart add 1 -kd
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.product.quantity = 1;
            cartItems.push(this.product);
        }

        setLocalStorage("so-cart", cartItems);

        updateCartCount();
    }
    renderProductDetails() {
        // Method to populate the HTML with product details.
        productDetailsTemplate(this.product);
    }
};

function productDetailsTemplate(product) {
    document.querySelector("#productBrand").textContent = product.Brand.Name;
    document.querySelector("#productName").textContent = product.NameWithoutBrand;

    const sourceMedium = document.querySelector("#productSourceMedium");
    const sourceLarge = document.querySelector("#productSourceLarge");
    const sourceExtraLarge = document.querySelector("#productSourceExtraLarge");
    sourceMedium.srcset = product.Images.PrimaryMedium;
    sourceLarge.srcset = product.Images.PrimaryLarge;
    sourceExtraLarge.srcset = product.Images.PrimaryExtraLarge;

    const productImage = document.querySelector("#productImage");
    productImage.src = product.Images.PrimarySmall;
    productImage.alt = product.NameWithoutBrand;

    // Check if there's a list price higher than the final price to calculate discount
    const hasDiscount = product.ListPrice && product.ListPrice > product.FinalPrice;

    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });

    const finalPriceFormatted = formatter.format(Number(product.FinalPrice));

    let priceHTML = `<span class="final-price">${finalPriceFormatted}</span>`;

    if (hasDiscount) {
        const listPriceFormatted = formatter.format(Number(product.ListPrice));
        const savings = (product.ListPrice - product.FinalPrice).toFixed(2);
        const percent = Math.round(((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100);

        priceHTML = `
            <span class="list-price" style="text-decoration: line-through; color: #727272; margin-right: 10px;">${listPriceFormatted}</span>
            <span class="final-price">${finalPriceFormatted}</span>
            <p class="discount-flag" style="background-color: #d9534f; color: white; padding: 4px 8px; font-weight: bold; display: inline-block; border-radius: 4px; font-size: 0.85rem; margin-top: 5px;">SAVE €${savings} (${percent}%)!</p>
        `;
    }

    document.querySelector("#productPrice").innerHTML = priceHTML;
    document.querySelector("#productColor").textContent = product.Colors[0].ColorName;
    document.querySelector("#productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#addToCart").dataset.id = product.Id;
}



// === THE FOLLOWING ALTERNATIVE METHOD IS COMMENTED OUT, IT'S A DIFFERENT SOLUTION FROM THE ANSWERS PROVIDED IN THE COURSE. ===

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }