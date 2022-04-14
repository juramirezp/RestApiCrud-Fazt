import { Router } from "express";
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);

router.post("/products", createProduct);

router.put("/products", updateProduct);

router.delete("/products", deleteProduct);

export default router;
