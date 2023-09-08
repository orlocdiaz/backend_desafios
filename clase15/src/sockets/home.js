function homeSocket(io) {
  io.of('/').on('connection', (socket) => {
    console.log('User connected for home');
  });
}

module.exports = homeSocket;
