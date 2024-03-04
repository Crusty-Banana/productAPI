const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addOneProduct,
  change: updateOneProduct,
  remove: deleteOneProduct,
} = require("../../database/productRepository");

async function displayProducts(ctx) {
  try {
    const { limit, orderBy } = ctx.request.query;
    let products = getAllProducts();
    if (orderBy) {
      if (orderBy === "desc") {
        products.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else if (orderBy === "asc") {
        products.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      }
    }
    if (limit) {
      products = products.slice(0, limit);
    }
    await ctx.render("products", { products });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}
async function displayProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query;
    const product = getOneProduct(id);
    if (product) {
      const fieldsArray = fields ? fields.split(",") : Object.keys(product);
      let requestedProduct = {};
      fieldsArray.forEach((key) => {
        requestedProduct[key] = product[key];
      });
      return await ctx.render("product", { requestedProduct });
    }
    throw new Error("Product not found with that id!");
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function getProducts(ctx) {
  try {
    const { limit, orderBy } = ctx.request.query;
    let products = getAllProducts();
    if (orderBy) {
      if (orderBy === "desc") {
        products.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else if (orderBy === "asc") {
        products.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      }
    }
    if (limit) {
      products = products.slice(0, limit);
    }
    ctx.body = {
      data: products,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query;
    const product = getOneProduct(id);
    if (product) {
      const fieldsArray = fields ? fields.split(",") : Object.keys(product);
      let requested_product = {};
      fieldsArray.forEach((key) => {
        requested_product[key] = product[key];
      });
      return (ctx.body = {
        data: requested_product,
      });
    }
    throw new Error("Product not found with that id!");
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function addProduct(ctx) {
  try {
    const product = ctx.request.body;
    addOneProduct(product);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function updateProduct(ctx) {
  try {
    const { id } = ctx.params;
    const product = ctx.request.body;
    updateOneProduct(id, product);
    ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    deleteOneProduct(id);
    ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

module.exports = {
  displayProducts,
  displayProduct,
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
