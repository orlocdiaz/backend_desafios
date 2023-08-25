const socket = io('/products');

socket.on('S-SI', () => {
  console.log('SI');
  // socket.emit('C-Add', product);
});

// console.log('prods');
