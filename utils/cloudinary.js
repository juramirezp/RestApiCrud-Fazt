import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUDNAME,
	api_key: process.env.CLOUDINARY_APIKEY,
	api_secret: process.env.CLOUDINARY_APISECRET,
	secure: true,
});

export async function uploadImage(filePath) {
	return await cloudinary.uploader.upload(filePath, {
		folder: "rest-api-fazt",
	});
}

export async function deleteImage(public_id) {
	return await cloudinary.uploader.destroy(public_id);
}
