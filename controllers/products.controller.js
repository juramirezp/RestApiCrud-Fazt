import Product from "../models/product.model.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price } = req.body;

		const product = new Product({
			name,
			description,
			price,
		});

		if (req.files.image) {
			const result = await uploadImage(req.files.image.tempFilePath);
			product.image = {
				public_id: result.public_id,
				secure_url: result.secure_url,
			};
			await fs.unlink(req.files.image.tempFilePath);
		}

		await product.save();

		res.json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Product.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image.public_id) {
			await deleteImage(product.image.public_id);
		}

		res.json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
