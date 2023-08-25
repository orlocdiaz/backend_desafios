const mongoose = require('mongoose');

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  products: [Object],
});

const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = Cart;
