import express from 'express';
import ProductManager from './index.js';

const server = express();
const port = 8080;
const MyProducts = new ProductManager();

server.get('/', async (req, res, next) => {
  try {
    res.send(await MyProducts.getProducts());
  } catch (error) {
    next(error);
  }
});
server.get('/products', async (req, res, next) => {
  try {
    const { limit } = req.query;
    const products = await MyProducts.getProducts();
    const limitedProducts = products.filter((product, i) => {
      if (i <= limit - 1) {
        return product;
      }
    });
    res.send(limitedProducts);
  } catch (error) {
    next(error);
  }
});
server.get('/products/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    res.send(await MyProducts.getProductById(id));
  } catch (error) {
    next(error);
  }
});

server.listen(port, () => {
  console.log('Conectado al puerto 8080');
});
