const Koa = require("koa");
const koaBody = require("koa-body");
const productRouter = require("./routes/productRoutes");
const render = require("koa-ejs");
const path = require("path");

const app = new Koa();

render(app, {
  root: path.join(__dirname, "views"),
  layout: false,
  viewExt: "ejs",
  cache: false, // Disable caching in development
  debug: true,
});

app.use(koaBody());
app.use(productRouter.routes());
app.use(productRouter.allowedMethods());

app.listen(5000);
