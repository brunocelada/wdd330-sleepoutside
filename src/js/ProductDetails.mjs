<<<<<<< HEAD
import { setLocalStorage } from "./utils.mjs";
=======
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
>>>>>>> d97210ac3c5ba5bf4b170402d71aab5350b3f12d

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
<<<<<<< HEAD

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
=======
    async init() {
        // === DETAILS OF init() ===
        // 1. The datasource get the details for the current product. 
        // 2. findProductById will return a promise (we can use await or .then() to process it)
        // 3. The product details are needed before rendering the HTML
        // 4. Once the HTML is rendered, we add a EventListener to the Add to Cart button
        // 5. The readings from this week explains why we need to use .bind(this), and what happens if we don't use it.
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
    }
    renderProductDetails() {
        // Method to populate the HTML with product details.
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
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
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
>>>>>>> d97210ac3c5ba5bf4b170402d71aab5350b3f12d
