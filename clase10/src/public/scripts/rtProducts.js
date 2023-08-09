const socket = io();

/* function allSocketProducts(products) {
  socket.sockets.emit('products');
} */

function addSocketProduct(product) {
  const title = document.getElementById('inTitle').value;
  const description = document.getElementById('inDesc').value;
  const code = document.getElementById('inCode').value;
  const price = document.getElementById('inPrice').value;
  const stock = document.getElementById('inStock').value;
  const category = document.getElementById('inCat').value;
  const image = document.getElementById('inImage').value;
  const prod = {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails: [...this.thumbnails, image],
  };
  socket.emit('client: newProduct', prod);
}

socket.on('server: products', (product) => {
  let products = document.querySelector('.products');
  const output = `
  <div class='product'>
  <img src='${product.thumbnails}' alt='${product.title}' />
  <h3>${product.title}</h3>
  <h5>${product.category}</h5>
  <p>${product.description}</p>
  <strong>${product.price}</strong>
</div>
`;
  products.appendChild(output);
});

socket.on('server: post', (product) => {
  console.log(product);
});
