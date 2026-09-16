import { renderListWithTemplate } from "./utils.mjs";

function categoryCardTemplate(category) {
    return `<li class="category-card">
        <a href="product_listing/${category.urlName}">
            <img src="${category.Image}"
                alt="Image of ${category.Name}" />
            <h2 class="card__name">${category.Name}</h2>
        </a>
    </li>`;
}

export default class CategoryList {
    constructor(dataSource, listElement) {
        this.listElement = listElement;
        this.dataSource = dataSource;
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(categoryCardTemplate, this.listElement, list);
    }
}

