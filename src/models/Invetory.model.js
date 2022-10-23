import mongoose from "mongoose";
const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  quantity: Number,
  reservations: Array,
});
export default Inventory = newMongoDBConn.model("inventory");
