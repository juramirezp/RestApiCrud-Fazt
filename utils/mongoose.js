import mongoose from "mongoose";

const MONGO = process.env.MONGODB_URI;

export async function connectToDB() {
	try {
		await mongoose.connect(MONGO);
		console.log("conected to db");
	} catch (error) {
		console.log(error);
	}
}
