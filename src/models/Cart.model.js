import { Schema } from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";

const cartSchema = new Schema({
  userId: Number,
  cartId: Number,
  status: {
    type: String,
    default: "active",
  },
  modifiedOn: {
    type: Date,
    default: Date.now,
  },
  products: Array,
});
export default Cart = newMongoDBConn.model("cart", cartSchema);
