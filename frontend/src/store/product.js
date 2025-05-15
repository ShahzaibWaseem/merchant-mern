import { create } from "zustand";
import { toaster } from "../components/ui/toaster";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.price || !newProduct.image){
			return { success: false, message: "Please fill all fields" };
		}
		const response = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await response.json();

		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const response = await fetch("/api/products");
		const data = await response.json();
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		const response = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});

		const data = await response.json();
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			products: state.products.filter(product => product._id !== pid),
		}));

		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const response = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await response.json();

		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			products: state.products.map(product => product._id === pid ? data.data : product),
		}));
		return { success: true, message: data.message };
	}
}));

export const showToast = (success, message) => {
	toaster.create({
		title: success ? "Success" : "Error",
		type: success ? "success" : "error",
		description: message,
		duration: 6000,
	});
}