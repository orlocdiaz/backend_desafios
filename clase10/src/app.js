const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');
const router = require('./routes/index.router.js');
const ProductManager = require('./controllers/ProductManager.js');

const app = express();
const port = 8080;

const MyProducts = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', router);

const httpServer = app.listen(port, () => {
  console.log(`🚀 Server running on port http://localhost:${port}`);
});

const socket = new Server(httpServer);

socket.on('connection', async (socket) => {
  const products = await MyProducts.getProducts();

  console.log('👤 New connection: ', socket.id);
  socket.emit('S-RTP', products);

  socket.on('C-AddRTP', async (product) => {
    await MyProducts.addProducts(product);
    socket.emit('S-RTP', products);
  });

  socket.on('C-DelRTP', async (id) => {
    await MyProducts.deleteProducts(id);
    socket.emit('S-RTP', products);
  });
});

module.exports = { httpServer };
