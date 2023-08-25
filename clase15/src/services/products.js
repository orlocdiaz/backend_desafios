const fs = require('fs');
const MyError = require('../utils/myError');

class ProductsService {
  constructor() {
    this.products = [];
    this.path = './src/json/Products.json';
  }

  #write = async () => {
    fs.promises.writeFile(this.path, JSON.stringify(this.products));
  };

  get = async () => {
    if (!fs.existsSync(this.path) || fs.readFileSync(this.path).length === 0) {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }
    const fileData = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    if (fileData) {
      this.products = fileData;
      return fileData;
    } else {
      throw new MyError(500, 'Internal Error', 'Unable to get products!');
    }
  };

  add = async (product) => {
    const fileData = await this.get();
    this.products = fileData;
    this.products.push(product);

    try {
      await this.#write();
      return product;
    } catch (error) {
      throw new MyError(500, 'Internal Error', 'Unable to add product!');
    }
  };

  update = async (index, product) => {
    const fileData = await this.get();
    this.products = fileData;
    this.products[index] = product;

    try {
      await this.#write();
      return { status: 'Product updated successfully!', product };
    } catch (error) {
      throw new MyError(500, 'Internal Error', 'Unable to update product!');
    }
  };

  delete = async (index) => {
    const fileData = await this.get();
    this.products = fileData;
    const deletedCode = this.products[index].code;
    this.products.splice(index, 1);

    try {
      await this.#write();
      return {
        status: `Product with {code: ${deletedCode}} deleted successfully!`,
      };
    } catch (error) {
      throw new MyError(500, 'Internal Error', 'Unable to delete product!');
    }
  };
}

module.exports = new ProductsService();
