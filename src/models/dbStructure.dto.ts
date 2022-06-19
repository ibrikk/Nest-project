import { Product } from '.';

export class DbStructure {
  constructor(json?) {
    if (json === null || json === undefined) return this;
    const productArray = json.products;
    if (productArray && productArray.length) {
      this.products = productArray.map(el => new Product(el))
    } else {
      this.products = [];
    }
    this.lastModifiedDate = new Date(json.date);
  }

  products: Product[];
  lastModifiedDate: Date;
  
}
