import { Router } from "express";
import { createBrands, getBrands } from "../../controllers/Brand.control.js";
const router = new Router();
router.get("/", getBrands);
router.post("/createBrands", createBrands);

export default router;
