import fs from "fs";

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
  }

  getProducts() {
    if (fs.existsSync(this.path)) {
      const file = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(file);
    } else {
      this.products = [];
    }
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === parseInt(id));
  }

  addProduct(product) {
    const newProduct = { ...product, id: this.products.length + 1 };
    this.products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    return newProduct;
  }

  updateProduct(id, newProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = { ...newProduct, id };
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    return this.products[index];
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
  }
}

export default ProductManager;
