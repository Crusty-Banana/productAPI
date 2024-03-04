const faker = require("faker");
const fs = require("fs");

function generateRandomProducts() {
  let products = [];
  for (let i = 0; i < 1000; i++) {
    const product = {
      id: faker.datatype.number(),
      name: faker.commerce.productName(),
      price: faker.datatype.number({ min: 1, max: 100 }),
      description: faker.lorem.sentence(),
      product: faker.commerce.product(),
      color: faker.commerce.color(),
      createdAt: faker.date.past().toISOString(),
      image: faker.image.imageUrl(),
    };
    products.push(product);
  }
  return products;
}
const data = { data: generateRandomProducts() };
fs.writeFileSync("./src/database/products.json", JSON.stringify(data));
console.log("data added!");
