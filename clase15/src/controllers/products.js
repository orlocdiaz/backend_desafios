const ProductsService = require('../services/products');
const Manager = require('../utils/manager');

class ProductsController {
  constructor() {
    this.duplicateValidations = ['title', 'code'];
    this.requiredFields = [
      'title',
      'description',
      'code',
      'price',
      'stock',
      'category',
    ];
    this.manager = new Manager(ProductsService);
  }

  //* GET ALL & LIMIT
  getProducts = async (req, res) => {
    const products = await this.manager.getAll();
    const { limit } = req.query;

    //* GET Limited Products
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.status(200).json(limitedProducts);
      return limitedProducts;
    } else {
      //* GET All Products
      res.status(200).json(products);
      return products;
    }
  };

  //* GET BY ID
  getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    const productById = await this.manager.getById(id);
    const product = productById.item;

    res.status(200).json(product);
    return product;
  };

  //* ADD
  addProduct = async (req, res) => {
    const product = {
      id: undefined,
      status: undefined,
      ...(await req.body),
    };

    //* Validations
    await this.manager.validateRequired(product, this.requiredFields);
    await this.manager.validateDuplicated(product, this.duplicateValidations);

    //* Generate ID
    const newId = await this.manager.generateId();
    product.id = newId;

    //* Set product status
    product.status = !product.status && true;

    const added = await this.manager.add(product);
    res.status(200).json(added);
    return added;
  };

  //* UPDATE
  updateProduct = async (req, res) => {
    const id = parseInt(req.params.pid);
    const update = req.body;

    const productById = await this.manager.getById(id);
    const index = productById.index;

    await this.manager.validateUpdate(index, update);
    await this.manager.validateDuplicated(update, this.duplicateValidations);

    const product = { ...productById.item, ...update };

    await this.manager.validateRequired(product, this.requiredFields);
    const updated = await ProductsService.update(index, product);

    res.status(200).json(updated);
    return updated.product;
  };

  //* DELETE
  deleteProduct = async (req, res) => {
    const id = parseInt(req.params.pid);

    const productById = await this.manager.getById(id);
    const index = productById.index;

    const deleted = await ProductsService.delete(index);
    res.status(200).json(deleted);
    return deleted;
  };

  //* SOCKET
}

module.exports = new ProductsController();
