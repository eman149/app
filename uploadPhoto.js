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
 

//  exports.upload = asyncHandler( async (req, res) => {

//   try {
//       // Upload image to Cloudinary
//       console.log(req.file) ;
//       const image = await imageKitConfig.upload({
//         file: req.file.buffer.toString('base64'),
//         fileName: req.file.originalname,
//         folder: '/upload'

//     }) ;
//       const document = await User.findById (
//         req.params.id,{
//           profileImg: req.body.image,
//         }) ;
      
//       // Send the Cloudinary URL in the response
//      // res.json({ imageUrl: image.url }) ;

//       if (!document) {
//         return next(new apierror(`No document for this id ${req.params.id}`, 404));
//       }
//       res.status(200).json({ imageUrl: image.url , data: document 
//     }) ;
//  } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error uploading image ' });
//     }

// } ) ;

//   // Express route for image upload
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      // Upload image to Cloudinary
      console.log(req.file) ;
      const image = await imageKitConfig.upload({
        file: req.file.buffer.toString('base64'),
        fileName: req.file.originalname,
        folder: '/upload'
    }) ;
      
      
      // Send the Cloudinary URL in the response
      res.json({ imageUrl: image.url });
 } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    }
});





module.exports = router;
  