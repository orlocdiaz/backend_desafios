function homeSocket(io) {
  io.on('connection', (socket) => {
    console.log('User connected for home');
  });
}

module.exports = homeSocket;
