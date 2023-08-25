const ProductsService = require('../services/products');
const Manager = require('../utils/manager');

class ViewsController {
  constructor() {
    this.manager = new Manager(ProductsService);
  }

  //* RENDER PRODUCTS
  renderProducts = async (req, res) => {
    try {
      const products = await this.manager.getAll();
      await res.render('products', products);
    } catch (error) {
      res.render('error', { message: error.message });
    }
  };

  //* RENDER CHAT
  renderChat = async (req, res) => {
    try {
      await res.render('chat');
    } catch (error) {
      res.render('error', { message: error.message });
    }
  };
}

module.exports = new ViewsController();
