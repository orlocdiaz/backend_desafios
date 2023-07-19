import fs from 'fs';

export default class ProductManager {
  constructor() {
    this.products = [];
    this.id = 1;
    this.path = 'Products.txt';
  }

  //* ADD
  async addProducts(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error('Please fill all the fields');
      } else {
        if (fs.existsSync(this.path)) {
          const fileData = JSON.parse(
            await fs.promises.readFile(this.path, 'utf-8')
          );
          this.products = fileData.length && fileData;
          this.id = fileData.length + 1;
        }
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
          throw new Error('Code already exists');
        } else {
          this.id++;
          this.products.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //* GET BY ID
  async getProductById(id) {
    const fileData = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    const product = fileData.find((element) => element.id === id);
    if (product) {
      return product;
    } else {
      console.error('Not found');
    }
  }

  //* GET
  async getProducts() {
    try {
      const fileData = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      return fileData;
    } catch (error) {
      console.error(error);
    }
  }

  //* UPDATE
  async updateProducts(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    const fileData = JSON.parse(
      await fs.promises.readFileSync(this.path, 'utf-8')
    );
    const product = fileData.some((element) => element.id === id);
    if (product) {
      fileData.forEach((prod) => {
        if (prod.id === id) {
          title && (prod.title = title),
            description && (prod.description = description),
            price && (prod.price = price),
            thumbnail && (prod.thumbnail = thumbnail),
            code && (prod.code = code),
            stock && (prod.stock = stock);
        }
      });
      await fs.promises.writeFileSync(this.path, JSON.stringify(fileData));
    } else {
      console.error('No se ha encontrado un producto con ese id');
    }
  }

  //* DELETE
  async deleteProduct(id) {
    const fileData = JSON.parse(
      await fs.promises.readFileSync(this.path, 'utf-8')
    );
    const product = fileData.some((element) => element.id === id);
    if (product) {
      fileData.filter((prod) => prod.id !== id);
      await fs.promises.writeFileSync(this.path, JSON.stringify(fileData));
    } else {
      console.error('No se ha encontrado producto con ese id');
    }
  }
}

//* Ejemplos para pruebas
// const MyProducts = new ProductManager();
/* MyProducts.addProducts(
  'Coca Cola Zero',
  'Descripción de producto Coca Cola Zero',
  24,
  'No Img',
  '234',
  108
); */
