const cloudinary = require ("cloudinary") ;

cloudinary.config({
    // cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
    // api_key : process.env.CLOUDINARY_API_KEY ,
    // api_secret : process.env.CLOUDINARY_API_SECRET ,

    cloud_name : "da9ilza4l" ,
    api_key :  "383674921519854" ,
    api_secret : "u8URN3Ke-2H4JTli9jSTnKseT-0" ,
}) ;


////cloudinaryupload img 

const cloudinaryUploadImage = async (fileToUpload) => {
    try{
        const data = await cloudinary.uploader.upload(fileToUpload ,{
            resource_type : 'auto' ,
        }) ;
        return data ;
    }
    catch(error) {
        return error ;
    }
}


////cloudinary Remove img 

const cloudinaryRemoveImage = async (imagePublicId) => {
    try{
        const result = await cloudinary.uploader.destroy(imagePublicId ) ;
        return result ;
    }
    catch(error) {
        return error ;
    }
}

module.exports = {
    cloudinaryRemoveImage ,
    cloudinaryUploadImage
}
