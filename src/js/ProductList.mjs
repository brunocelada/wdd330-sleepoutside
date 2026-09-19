import { renderListWithTemplate } from "./utils.mjs";
import { updateBreadcrumb } from "./breadcrumb.mjs";

function productCardTemplate(product) {
    const discount =
        product.FinalPrice < product.SuggestedRetailPrice
            ? Math.round(
                ((product.SuggestedRetailPrice - product.FinalPrice) /
                    product.SuggestedRetailPrice) *
                100,
            )
            : 0;

    const discountIndicator =
        discount > 0
            ? `<span class="discount-indicator">SALE - ${discount}% OFF</span>`
            : "";

    return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <picture>
                <source
                    media="(min-width: 940px)"
                    srcset="${product.Images.PrimaryExtraLarge}"
                />
                <source
                    media="(min-width: 760px)"
                    srcset="${product.Images.PrimaryLarge}"
                />
                <source
                    media="(min-width: 380px)"
                    srcset="${product.Images.PrimaryMedium}"
                />
                <img
                    src="${product.Images.PrimarySmall}"
                    alt="Image of ${product.Name}"
                />
            </picture>
            ${discountIndicator}
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.listElement = listElement;
        this.dataSource = dataSource;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);

        this.renderList(list);

        if (this.category) {
            const categoryName = this.category.charAt(0).toUpperCase() + this.category.slice(1);
            document.querySelector(".title").textContent = categoryName;
            updateBreadcrumb(this.category, list.length);
        }
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}