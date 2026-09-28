import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
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
        // 1. The datasource get the details for the current product. 
        // 2. findProductById will return a promise (we can use await or .then() to process it)
        // 3. The product details are needed before rendering the HTML
        // 4. Once the HTML is rendered, we add a EventListener to the Add to Cart button
        // 5. The readings from this week explains why we need to use .bind(this), and what happens if we don't use it.
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
        alertMessage("Product added to cart");
    }
    renderProductDetails() {
        // Method to populate the HTML with product details.
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    // console.log(product);
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
    createImageCarousel(product);

    const euroPrice = new Intl.NumberFormat("de-DE",
        {
            style: "currency", currency: "EUR",
        }).format(Number(product.FinalPrice));
    document.querySelector("#productPrice").textContent = `${euroPrice}`;
    document.querySelector("#productColor").textContent = product.Colors[0].ColorName;
    document.querySelector("#productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#addToCart").dataset.id = product.Id;
}
// BC-C: if there are ExtraImages in the data for a product, the product image on
// the product details page change to a carousel and all images are shown as options.
function createImageCarousel(product) {
    const extraImages = product.Images.ExtraImages;

    if (!extraImages || extraImages.length === 0) {
        return;
    }

    const container = document.querySelector("#productImageOptions");
    const productImage = document.querySelector("#productImage");

    const images = [
        {
            Title: product.NameWithoutBrand,
            Src: product.Images.PrimarySmall,
            PrimaryMedium: product.Images.PrimaryMedium,
            PrimaryLarge: product.Images.PrimaryLarge,
            PrimaryExtraLarge: product.Images.PrimaryExtraLarge
        },
        ...(product.Images.ExtraImages || []).map((image) => ({
            Title: image.Title,
            Src: image.Src,
            PrimaryMedium: image.Src,
            PrimaryLarge: image.Src,
            PrimaryExtraLarge: image.Src
        }))
    ];

    images.forEach((image) => {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("product-image-option");

        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = image.Src;
        thumbnailImage.alt = image.Title;

        button.appendChild(thumbnailImage);
        container.appendChild(button);

        button.addEventListener("click", () => {
            productImage.src = image.Src;
            productImage.alt = image.Title;
            document.querySelector("#productSourceMedium").srcset = (image.PrimaryMedium || image.Src);
            document.querySelector("#productSourceLarge").srcset = (image.PrimaryLarge || image.Src);
            document.querySelector("#productSourceExtraLarge").srcset = (image.PrimaryExtraLarge || image.Src);
        });
    });
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