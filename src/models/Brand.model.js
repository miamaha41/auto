import mongoose from "mongoose";
import { newMongoDBConn } from "../services/mongoDb.js";
const BrandSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);
const Brand = newMongoDBConn.model("brand", BrandSchema);
export default Brand;
