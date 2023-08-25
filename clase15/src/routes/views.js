const { Router } = require('express');
const tryCatch = require('../utils/tryCatch');
const ViewsController = require('../controllers/views');

const viewsRouter = Router();

viewsRouter.get('/', tryCatch(ViewsController.renderProducts));

module.exports = viewsRouter;
