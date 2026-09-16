import { renderListWithTemplate } from "./utils.mjs";

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
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}"
                alt="Image of ${product.Name}" />
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
        const list = await this.dataSource.getData();

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

        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}