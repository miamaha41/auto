import { Router } from "express";
import {
  createCategories,
  getCategories,
} from "../../controllers/Category.control.js";

const router = new Router();
router.get("/", getCategories);
router.post("/createCategories", createCategories);
export default router;
