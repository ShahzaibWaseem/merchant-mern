import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true,
		default: 0.0
	},
	image: {
		type: String,
		required: true,
		trim: true
	},
}, {
	timestamps: true	// Automatically add createdAt and updatedAt fields
});

const Product = mongoose.model("Product", productSchema);

export default Product;