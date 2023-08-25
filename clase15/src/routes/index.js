const { Router } = require('express');
const productsRouter = require('./products');
const viewsRouter = require('./views');
const chatRouter = require('./chat');

const router = Router();

router.use('/api/products', productsRouter);
router.use('/', viewsRouter);
router.use('/products', viewsRouter);
router.use('/chat', chatRouter);

module.exports = router;
