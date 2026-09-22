import { convertToJson } from "./ExternalServices.mjs";

export default class CategoryData {
  constructor() {
    this.path = `/json/categories.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findCategoryById(id) {
    const category = await this.getData();
    return category.find((item) => item.Id === id);
  }
};
