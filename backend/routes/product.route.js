import express from "express";
import { createProduct, updateProduct, deleteProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);			// Fetch all products
router.post("/", createProduct);		// Create a new product
router.put("/:id", updateProduct);		// Update a product by ID
router.delete("/:id", deleteProduct);	// Delete a product by ID

export default router;