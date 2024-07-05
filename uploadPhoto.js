const cloudinary = require ('cloudinary').v2;
const upload = require('./multer-confing');
const router = require('express').Router();
const imageKit = require('imagekit') ;
const dotenv = require('dotenv') ;
dotenv.config({ path: 'config1.env' });
const User = require('./models/usermodel');
const asyncHandler = require('express-async-handler');
const apierror = require('./utils/apierror');

// Cloudinary configuration
const imageKitConfig = new imageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
 

// //   // Express route for image upload
// router.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//       // Upload image to Cloudinary
//       console.log(req.file) ;
//       const image = await imageKitConfig.upload({
//         file: req.file.buffer.toString('base64'),
//         fileName: req.file.originalname,
//         folder: '/upload'
//     }) ;
      
      
//       // Send the Cloudinary URL in the response
//       res.json({ imageUrl: image.url });
//  } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error uploading image to Cloudinary' });
//     }
// });




//   // Express route for image upload
router.post('/upload/:userId', upload.single('image'), async (req, res) => {
  try {
    const userId = req.params.userId;
    const uploadedFile = req.file;

    if (!uploadedFile) {
        return res.status(400).json({ message: 'No image uploaded' });
    }
    // Upload image to imageKit
    console.log(req.file) ;
    const uploadResult = await imageKitConfig.upload({
      file: req.file.buffer.toString('base64'),
      fileName: req.file.originalname,
      folder: '/upload'
  }) ;
  if (!uploadResult || !uploadResult.url) {
    return res.status(500).json({ message: 'Image upload failed' });
}
    
    // Create a new user or update existing user's imageUrl
    const user = await User.findOneAndUpdate(
      { _id : userId} ,
    //  { userId },
      { imageUrl: uploadResult.url },
      { upsert: true, new: true } // Upsert: create if not found, new: return updated user
  );

  res.json({ message: 'Image uploaded successfully!',data : user });
    
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  }
});






module.exports = router;
  