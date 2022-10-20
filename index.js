import express from "express";
import "dotenv/config";
import productRouter from "./src/routes/v1/Product.Router.js";
import orderRouter from "./src/routes/v1/Order.Router.js";
import userRouter from "./src/routes/v2/User.Router.js";
import categoryRouter from "./src/routes/v2/Category.Router.js";
import cors from "cors";
import { handleError, showError } from "./src/middlewares/handleError.js";
import { getProductByName } from "./src/controllers/Product.control.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
// app.get("/", (req, res, next) => {
//   res.send("Homepage");
// });
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/category", categoryRouter);
app.use(handleError, showError);
app.get("/search/", getProductByName);
app.listen(PORT, () => {
  console.log(`running at :${PORT}/`);
});
// ServiceWorker.unregister();
