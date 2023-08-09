const { Router } = require('express');
const { homeProducts, socketProducts } = require('./views.router.js');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('./products.router.js');
const { getCart, addCart, addCartProduct } = require('./cart.router.js');

const router = Router();

//* Home products
router.get('/', homeProducts);

//* Socket products
router.get('/realtimeproducts', socketProducts);

//* Products routes
router.get('/api/products/:id?', getProducts);
router.post('/api/products', addProduct);
router.put('/api/products/:pid', updateProduct);
router.delete('/api/products/:pid', deleteProduct);

//* Cart routes
router.get('/api/carts/:cid?', getCart);
router.post('/api/carts', addCart);
router.post('/api/carts/:cid/product/:pid', addCartProduct);

module.exports = router;
