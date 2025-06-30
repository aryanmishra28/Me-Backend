import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (LocalFilePath) => {
  try {
    if (!LocalFilePath) return null; // 🛑 Don't upload if path is missing

    const response = await cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto",
      folder: "users"
    });

    console.log("File uploaded successfully:", response.url);

    fs.unlinkSync(LocalFilePath); // ✅ delete temp file
    return response;
  } catch (error) {
    console.error("Upload error:", error);
    fs.unlinkSync(LocalFilePath); // Delete temp file even on error
    return null;
  }
};


export { uploadOnCloudinary};