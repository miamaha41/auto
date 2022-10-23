import { Schema } from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";

const cartSchema = new Schema({
  userId: Number,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number,
    },
  ],
});
export default Cart = newMongoDBConn.model("cart", cartSchema);
