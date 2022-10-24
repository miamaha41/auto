import mongoose from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";

const productSchema = mongoose.Schema(
  {
    // productId: {
    //   type: Number,
    //   required: true,
    //   unique: true,
    // },
    // code: String,
    brand: {
      type: String,
    },
    // types: {
    //   type: "String",
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    currentPrice: {
      type: Number,
      default: 0,
    },
    imgSrc: {
      type: Array,
      required: true,
    },
    saleFlash: {
      type: Number,
      default: 0,
    },
    desc: {
      type: String,
      required: true,
    },
    // brandId: String,
    quantity: {
      type: Number,
      required: true,
    },
    // productId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Order",
    // },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);

const Product = newMongoDBConn.model("Products", productSchema);

export default Product;
