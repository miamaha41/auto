import mongoose from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";

const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number,
      name: String,
      currentPrice: Number,
      imgSrc: String,
    },
  ],
  bill: Number,
});
const Cart = newMongoDBConn.model("cart", cartSchema);
export default Cart;
