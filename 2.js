const cloudinaryUploadSingleImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        console.log("Image uploaded successfully:", result);
        return result;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
}