import { Router } from "express";
import {
  createProducts,
  deletedProduct,
  getProductById,
  getProducts,
  insertedProduct,
  updatedProduct,
} from "../../controllers/Product.control.js";
const router = Router();

/**
 * @router GET /product
 * @description Get All Product document
 * @access Public
 */
router.get("/", getProducts);

router.get("/:id", getProductById);
/**
 * @router POST /product/createProducts
 * @description Create new Product collection
 * @access Public
 */

router.post("/createProducts", createProducts);

/**
 * @router POST /product
 * @description Insert a new Product document
 * @access Public
 */
router.post("/", insertedProduct);

/**
 * @router PUT /product/:id
 * @description Update a Product document
 * @access Public
 */
router.put("/:id", updatedProduct);

/**
 * @router DELETE /product/:id
 * @description Delete a Product document
 * @access Public
 */
router.delete("/:id", deletedProduct);

export default router;
