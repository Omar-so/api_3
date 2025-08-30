import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: 'djiotyroa',
  api_key: process.env.APIKey,
  api_secret: process.env.APISecret,
});


export async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "students",        
      quality: "auto:good",     
      fetch_format: "auto",      
      transformation: [
        { width: 800, crop: "limit" } 
      ]
    });

    return {
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}

/**
 * Destroy (delete) image from Cloudinary
 */
export async function destroyImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result; 
  } catch (error) {
    console.error("Cloudinary Destroy Error:", error);
    throw error;
  }
}
