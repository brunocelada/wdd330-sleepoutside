import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.itemCount = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
    }
    calculateItemSubTotal() {
        this.itemTotal = 0;
        this.itemCount = 0;

        this.list.forEach((item) => {
            this.itemTotal += item.quantity * item.ListPrice;
            this.itemCount += item.quantity;
        });
        this.displayOrderTotals();
    }
    calculateOrderTotal() {
        this.tax = this.itemTotal * .06;
        if (this.itemCount > 0) {
            this.shipping = 10 + (this.itemCount - 1) * 2;
        } else {
            this.shipping = 0;
        }
        // Total
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #order-total`);

        subtotal.innerHTML = new Intl.NumberFormat("de-DE",
            {
                style: "currency", currency: "EUR",
            }).format(Number(this.itemTotal.toFixed(2)));
        tax.innerHTML = new Intl.NumberFormat("de-DE",
            {
                style: "currency", currency: "EUR",
            }).format(Number(this.tax.toFixed(2)));
        shipping.innerHTML = new Intl.NumberFormat("de-DE",
            {
                style: "currency", currency: "EUR",
            }).format(Number(this.shipping.toFixed(2)));
        orderTotal.innerHTML = new Intl.NumberFormat("de-DE",
            {
                style: "currency", currency: "EUR",
            }).format(Number(this.orderTotal.toFixed(2)));
    }
    packageItems(items) {
        return items.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: item.ListPrice,
            quantity: item.quantity,
        }));
    }
    async checkout(form) {
        try {
            const formData = new FormData(form);
            const order = {};

            formData.forEach((value, key) => {
                order[key] = value;
            });
            order.orderDate = new Date().toISOString();

            order.orderTotal = Number(this.orderTotal.toFixed(2));
            order.tax = Number(this.tax.toFixed(2));
            order.shipping = Number(this.shipping.toFixed(2));

            order.items = this.packageItems(this.list);

            // console.log("ORDER SENT:", order);
            const response = await ExternalServices.checkout(order);
            return response;
        } catch (error) {
            // console.error("Checkout error: ", error);
            alertMessage("There was a problem placing your order.");
        }

    }
}
