import { Router } from "express";
import { createBrands, getBrands } from "../../controllers/Brand.control.js";
const router = new Router();
router.get("/", getBrands);
router.get("/createBrands", createBrands);

export default router;
