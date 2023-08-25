const { Server } = require('socket.io');
const chatSocket = require('../sockets/chat');
const homeSocket = require('../sockets/home');
const productsSocket = require('../sockets/products');

function socketConfig(server, app) {
  const io = new Server(server);

  // app.set('socketio', io);

  homeSocket(io);
  productsSocket(io);
  chatSocket(io);
}

module.exports = socketConfig;
