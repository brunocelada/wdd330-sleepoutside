import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { updateCartCount } from "./cartCount.mjs";

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.services = new ExternalServices();
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = {
      ...Object.fromEntries(formData),
      orderDate: new Date().toISOString(),
      items: getLocalStorage(this.key) ?? [],
    };

    const result = await this.services.checkout(order);
    setLocalStorage(this.key, []);
    updateCartCount();
    return result;
  }
}
