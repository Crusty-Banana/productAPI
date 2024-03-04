const Router = require("koa-router");
const productHandler = require("../handlers/products/productHandlers");
const productInputMiddleware = require("../middleware/productInputMiddleware");

const router = new Router({ prefix: "" });

router.get("/api/products", productHandler.getProducts);
router.get("/api/product/:id", productHandler.getProduct);
router.post("/api/products", productInputMiddleware, productHandler.addProduct);
router.put(
  "/api/product/:id",
  productInputMiddleware,
  productHandler.updateProduct
);
router.del("/api/product/:id", productHandler.deleteProduct);
router.get("/products", productHandler.displayProducts);
router.get("/product/:id", productHandler.displayProduct);
module.exports = router;
