export function updateBreadcrumb(category, count = null) {
    const breadcrumb = document.querySelector("#breadcrumb");

    if (!breadcrumb || !category) return;

    const categoryName = category
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    if (count !== null) {
        breadcrumb.innerHTML = `
            <span class="title highlight">►${categoryName}</span>
            <span>--(${count} items)</span>
            <hr>
        `;
    } else {
        breadcrumb.innerHTML = `
            <a href="/product_listing/?category=${category}">
             <span class="title highlight">↪ ${categoryName}</span>
            </a>
            <hr>
        `;
    }
}