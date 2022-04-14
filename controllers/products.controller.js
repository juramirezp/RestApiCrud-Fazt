import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
	const products = await Product.find();
	res.json(products);
};

export const createProduct = async (req, res) => {
	const { name, description, price } = req.body;

	const product = new Product({
		name,
		description,
		price,
	});

	await product.save();

	res.json(product);
};

export const updateProduct = (req, res) => res.send("obteniendo");
export const deleteProduct = (req, res) => res.send("obteniendo");
