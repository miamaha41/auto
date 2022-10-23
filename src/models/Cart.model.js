import { Schema } from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";

const cartSchema = new Schema({
  userId: Number,
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number,
    },
  ],
});
const Cart = newMongoDBConn.model("cart", cartSchema);
export default Cart;
