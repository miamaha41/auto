import { Router } from "express";
import {
  clearCart,
  createCart,
  getCart,
} from "../../controllers/Cart.control.js";
const router = new Router();
router.get("/", getCart);
router.post("/", createCart);
router.delete("/", clearCart);
export default router;
