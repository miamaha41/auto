import { Router } from "express";
import { getOrders, insertedOrder } from "../../controllers/Order.control.js";

const router = Router();
/**
 * @router GET /order
 * @description Get All Order document
 * @access Public
 */
router.get("/", getOrders);

/**
 * @router POST /order
 * @description Insert a Order document
 * @access Public
 */
router.post("/", insertedOrder);

export default router;
