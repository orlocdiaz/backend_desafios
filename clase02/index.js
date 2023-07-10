class ProductManager {
  constructor() {
    this.products = [];
    this.id = 1;
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Please fill all the fields');
    } else {
      const product = {
        id: this.id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };
      const duplicated = this.products.find(
        (element) => element.code === product.code
      );
      if (duplicated) {
        console.error('This code already exists');
      } else {
        this.id++;
        this.products.push(product);
        return 'Added';
      }
    }
  }

  getProductById(id) {
    const product = this.products.find((element) => element.id === id);
    if (product) {
      return product;
    } else {
      console.error('Not found');
    }
  }

  getProducts() {
    return this.products;
  }
}
