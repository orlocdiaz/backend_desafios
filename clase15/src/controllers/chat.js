const Message = require('../models/Message');

class ChatController {
  //* GET MESSAGES
  async getMessages() {
    const messages = await Message.find();
    if (messages.length) {
      return messages;
    }
  }

  async addMessage(message) {
    try {
      await Message.create(message);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new ChatController();
