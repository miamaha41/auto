import mongoose from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
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
      productQuantity: Number,
    },
  ],
  bill: Number,
});
const Cart = newMongoDBConn.model("cart", cartSchema);
export default Cart;
