
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

// Function to upload file
const uploadFile = async (fileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: 'auto',
        });
        return data; 
    } catch (error) {
        console.error('Upload error:', error);
        return error;
    }
};

// Function to delete file
const deleteFile = async (publicId) => {
    try {
        const data = await cloudinary.uploader.destroy(publicId);
        return data; 
    } catch (error) {
        console.error('Delete error:', error);
        return error;
    }
};

module.exports = { uploadFile, deleteFile };
