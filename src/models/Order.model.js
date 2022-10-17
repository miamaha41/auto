import mongoose from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";
const product = mongoose.Schema({
  productId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Product",
    type: "String",
    required: true,
    unique: true,
  },
  quantity: {
    type: "Number",
    required: true,
    min: 1,
  },
});
const orderSchema = new mongoose.Schema(
  {
    cartId: Number,
    orderId: Number,
    userId: Number,
    shipping: {
      email: {
        type: "String",
        required: true,
      },
      address: {
        type: "String",
        required: true,
      },
      phone: {
        type: "Number",
        required: true,
      },
      name: {
        type: "String",
        required: true,
      },
    },
    listProducts: [product],
    payment: {
      type: "String",
      default: "COD",
    },
    note: {
      type: "String",
      default: "",
    },
  },
  { timestamps: true }
);

export const Order = newMongoDBConn.model("orders", orderSchema);
