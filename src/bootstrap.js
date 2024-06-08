import userRouter from "./modules/customer/customer.route.js";
import orderRouter from "./modules/orders/orders.route.js";
import productRouter from "./modules/product/product.route.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/orders", orderRouter);
  app.use("/product", productRouter);
  app.use("*", (req, res, next) => {
    res.json({ Massage: " URL Not Found" });
  });
};
export default bootstrap;
