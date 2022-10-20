import mongoose from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";
const categorySchema = new mongoose.Schema(
  {
    // id: {
    //   type: "Number",
    //   required: true,
    // },
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Category = newMongoDBConn.model("category", categorySchema);
export default Category;
