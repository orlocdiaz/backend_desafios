const ChatController = require('../controllers/chat');

function chatSocket(io) {
  io.of('/chat').on('connection', (socket) => {
    socket.emit('login');

    socket.on('logged', async () => {
      const messages = await ChatController.getMessages();
      socket.emit('messages', messages);
    });

    socket.on('message', async (message) => {
      await ChatController.addMessage(message);
      const messages = await ChatController.getMessages();
      socket.emit('messages', messages);
      socket.broadcast.emit('messages', messages);
    });
  });
}

module.exports = chatSocket;
