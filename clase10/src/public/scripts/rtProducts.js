const socket = io();

const productsContainer = document.querySelector('.products');
const addProduct = document.getElementById('addProduct');

async function realTimePost(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;
  const category = document.getElementById('category').value;
  const thumbnails = document.getElementById('thumbnails').value;

  const product = {
    title,
    description,
    price,
    stock,
    category,
    thumbnails,
  };

  await socket.emit('C-AddRTP', product);
}

async function realTimeDelete(id) {
  socket.emit('C-DelRTP', parseInt(id));
}

addProduct.addEventListener('click', realTimePost);

socket.on('S-RTP', (products) => {
  const productsList = products
    .map((product) => {
      const output = `
        <div class='product'>
          <img src='${product.thumbnails}' alt='${product.title}' />
          <h3>${product.title}</h3>
          <h5>${product.category}</h5>
          <p>${product.description}</p>
          <strong>${product.price}</strong>
          <button onclick="realTimeDelete('${product.id}')">Delete</button>
        </div>
      `;

      return output;
    })
    .join('\n');

  productsContainer.innerHTML = productsList;
});
