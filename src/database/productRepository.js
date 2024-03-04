const fs = require("fs");
const { data: products } = require("./products.json");

function getAll() {
  return products;
}

function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}

function add(data) {
  const updatedProducts = [data, ...products];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: updatedProducts })
  );
}

function change(id, data) {
  const updatedProducts = products.map((product) => {
    if (product.id == parseInt(id)) {
      return { ...product, ...data };
    }
    return product;
  });
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: updatedProducts })
  );
}

function remove(id) {
  const updatedProducts = products.filter(
    (product) => product.id != parseInt(id)
  );
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: updatedProducts })
  );
}

module.exports = {
  getOne,
  getAll,
  add,
  change,
  remove,
};
