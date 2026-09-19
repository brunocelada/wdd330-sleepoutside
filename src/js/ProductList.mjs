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
        this.sortElement = document.querySelector("#sort-products");
    }

    async init() {
        this.list = await this.dataSource.getData(this.category);

        // The TRELLO activity says:
        // "Note that there are more tents in that list than we are currently showing.
        // You should NOT display the extras as we do not have detail pages for those yet."

        // REMOVED BECAUSE THE EXPANSION OF THE INVENTORY
        // const selectedIds = [
        //     "880RR",
        //     "985RF",
        //     "985PR",
        //     "344YJ"
        // ];
        // const filteredList = list.filter(product =>
        //     selectedIds.includes(product.Id)
        // );

        this.sortProducts(this.sortElement.value);

        this.sortElement.addEventListener("change", () => {
            this.sortProducts(this.sortElement.value);
        });

        const categoryName = this.category.charAt(0).toUpperCase() + this.category.slice(1);
        document.querySelector(".title").textContent = categoryName;

        // BC- BREADCRUMB
        updateBreadcrumb(this.category, this.list.length);

    }

    renderList(list) {
        this.listElement.innerHTML = "";
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    // JW- PRODUCT SORTING
    sortProducts(sortOption) {
        const sortedList = [...this.list];

        switch (sortOption) {
            case "name-asc":
                sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
                break;

            case "name-desc":
                sortedList.sort((a, b) => b.Name.localeCompare(a.Name));
                break;

            case "price-asc":
                sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
                break;

            case "price-desc":
                sortedList.sort((a, b) => b.FinalPrice - a.FinalPrice);
                break;
        }

        this.renderList(sortedList);
    }
}