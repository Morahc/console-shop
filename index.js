const prompt = require('prompt-sync')({ sigint: true });
const products = require('./data');

const cart = [];
let input;

console.log('Welcome to the E - Commerce console app\nTo Checkout, type checkout and to Exit, type exit\n');
console.table(products);
console.log('Enter Product index to add to cart\n');

while (true) {
  input = prompt('input >> ');
  if (input == 'exit' || input == 'checkout') break;
  let product = products[Number(input)];

  if (!product) {
    console.log(`Product with index ${input} is not avaliable!`);
  } else {
    const { id, name, price } = product;
    let found = false;

    if (cart.length == 0) {
      cart.push({ id, name, price, qty: 1 });
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == product.id) {
          cart[i].qty++;
          found = true;
          break;
        }
      }
      if (!found) cart.push({ id, name, price, qty: 1 });
    }
    console.log(`${product.name} has been added to your cart!`);
  }
}

if (cart.length > 0 && input == 'checkout') {
  console.table(cart);
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
  });
  console.log(`Total price is $${total}`);
}

console.log('Thank you for shopping with us!');
