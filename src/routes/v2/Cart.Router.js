import { Router } from "express";
import {
  clearCart,
  createCart,
  getCart,
  updateCart,
} from "../../controllers/Cart.control.js";
const router = new Router();
router.get("/", getCart);
router.post("/", createCart);
router.delete("/", clearCart);
router.put("/", updateCart);
export default router;
