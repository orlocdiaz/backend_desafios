const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');
const router = require('./routes/index.router.js');

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(`Server activo en puerto: http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', router);

socketServer.on('connection', (socket) => {
  socket.on('client: products', (product) => {
    socket.emit('server: products', product);
  });
});

module.exports = socketServer;
