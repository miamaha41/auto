import { Router } from "express";
import { getCart } from "../../controllers/Cart.control.js";
import verifyToken from "../../middlewares/verifyToken.js";
const router = new Router();
router.get("/", verifyToken, getCart);
export default router;
