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
      return res.status(200).json(limitedProducts);
    } else {
      //* GET All Products
      return res.status(200).json(products);
    }
  };

  //* GET BY ID
  getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    const productById = await this.manager.getById(id);
    const product = productById.item;

    return await res.status(200).json(product);
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

    const added = await ProductsService.add(product);
    return res.status(200).json(added);
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
  };

  //* DELETE
  deleteProduct = async (req, res) => {
    const id = parseInt(req.params.pid);

    const productById = await this.manager.getById(id);
    const index = productById.index;

    const deleted = await ProductsService.delete(index);
    res.status(200).json(deleted);
  };
}

module.exports = new ProductsController();
