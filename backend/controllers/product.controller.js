import Product from "../models/product.model.js";	// Import the Product model
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});	// Fetch all products from the database
		res.status(200).json({ success: true, data: products });
		console.log("Fetched products successfully.");
	}
	catch (error) {
		console.error(`Error fetching products: ${error.message}`);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body;		// Assuming you send product data in the request body
	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all the details." });
	}

	const newProduct = new Product(product)

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	}
	catch(error) {
		console.error(`Product not created. Error: ${error.message}`);
		res.status(500).json({ success: false, message: "Server Error" })
	}
};

export const updateProduct = async (req, res) => {
	const {id} = req.params;	// Get product ID from request parameters

	const product = req.body;	// Assuming you send product data in the request body

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: `Invalid product ID ${id}.` });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });		// Update product by ID
		res.status(200).json({ success: true, data: updatedProduct });
	}
	catch (error) {
		console.error(`Error updating product: ${error.message}`);
		res.status(500).json({ success: false, message: "Server Error." });
	}
};

export const deleteProduct = async (req, res) => {
	const {id} = req.params;	// Get product ID from request parameters

	console.log(`Trying to delete product with ID: ${id}`);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: `Invalid product ID ${id}.` });
	}

	try {
		await Product.findByIdAndDelete(id);		// Delete product by ID
		res.status(200).json({ success: true, message: "Product deleted successfully." });
	}
	catch (error) {
		console.error(`Error deleting product: ${error.message}`);
		res.status(500).json({ success: false, message: "Server Error." });
	}
};