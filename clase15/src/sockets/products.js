function productsSocket(io, product) {
  // console.log(io.on('connection', () => 'Si'));
  io.on('connection', (socket) => {
    console.log('On');

    socket.emit('S-SI');
  });
}

module.exports = productsSocket;
