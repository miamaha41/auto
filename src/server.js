import express from "express";
import "dotenv/config";
import productRouter from "./routes/v1/Product.Router.js";
import orderRouter from "./routes/v1/Order.Router.js";
import userRouter from "./routes/v2/User.Router.js";
import categoryRouter from "./routes/v2/Category.Router.js";
// import { connectDB } from "./config/mongoDb.js";
import cors from "cors";
import { handleError, showError } from "./middlewares/handleError.js";

const app = express();
const PORT = process.env.PORT || 3000;
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
app.listen(PORT, () => {
  console.log(`running at :${PORT}/`);
});
// ServiceWorker.unregister();
