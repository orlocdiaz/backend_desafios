const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 1;
    this.path = 'Products.txt';
  }

  //* ADD
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
        fs.writeFileSync(this.path, JSON.stringify(this.products));
      }
    }
  }

  //* GET BY ID
  getProductById(id) {
    const fileData = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    const product = fileData.find((element) => element.id === id);
    if (product) {
      return product;
    } else {
      console.error('Not found');
    }
  }

  //* GET
  getProducts() {
    const fileData = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    return fileData;
  }

  //* UPDATE
  updateProducts(id, { title, description, price, thumbnail, code, stock }) {
    const fileData = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
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
      fs.writeFileSync(this.path, JSON.stringify(fileData));
    } else {
      console.error('No se ha encontrado un producto con ese id');
    }
  }

  //* DELETE
  deleteProduct(id) {
    const fileData = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    const product = fileData.some((element) => element.id === id);
    if (product) {
      fileData.filter((prod) => prod.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(fileData));
    } else {
      console.error('No se ha encontrado producto con ese id');
    }
  }
}

//* Ejemplos para pruebas
/* const MyProducts = new ProductManager();
MyProducts.addProducts(
  'LBGHIXOCnE',
  'desk position arrive loss feed replied page detail mark today cutting easy',
  30,
  'No Img',
  '123ABC',
  3
);
MyProducts.addProducts(
  'LBGHIasdasdasdXOCnE',
  'desk position arrive loss feed replied page detail mark today cutting easy',
  30,
  'No Img',
  '123BC',
  3
);
MyProducts.addProducts(
  'LBGHIXOCnE',
  'desk position arrive loss feed replied page detail mark today cutting easy',
  30,
  'No Img',
  '1ABC',
  3
);
MyProducts.deleteProduct(2);
MyProducts.updateProducts(1, {
  description: 'Cambio desc',
  title: 'Cambio title',
}); */
