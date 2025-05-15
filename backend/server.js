import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";	// Import product routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;		// Set port from environment variable or default to 5000

const __dirname = path.resolve();			// Get the directory name

app.use(express.json());					// Middleware to parse JSON request body

app.use("/api/products", productRoutes);	// Use product routes

if (process.env.NODE_ENV === "production") {									// If in production mode
	app.use(express.static(path.join(__dirname, "/frontend/dist")));			// Serve static files from frontend build directory

	app.get("/{*splat}", (req, res) => {	// Handle all other routes
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));// Send index.html file
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});