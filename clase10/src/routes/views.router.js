const ProductManager = require('../controllers/ProductManager.js');

const MyProducts = new ProductManager();

//* HOME PRODUCTS
async function homeProducts(req, res) {
  try {
    const products = await MyProducts.getProducts();
    await res.render('home', products);
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}

//* REALTIME PRODUCTS
async function socketProducts(req, res) {
  try {
    // const products = await MyProducts.getProducts();
    await res.render('realTimeProducts');
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}

module.exports = {
  homeProducts,
  socketProducts,
};
