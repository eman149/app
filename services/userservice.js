const asyncHandler = require('express-async-handler');
//const { v4: uuidv4 } = require('uuid');
//const sharp = require('sharp');
const bcrypt = require('bcrypt');

const factory = require('./handlersfactory');
const apierror = require('../utils/apierror');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const createToken = require('../utils/createToken');
const User = require('../models/usermodel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const path = require ("path") ;

// // Upload single image
exports.uploadUserImage = uploadSingleImage('profileImg');

// // Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {

  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    // Save image into our db
    req.body.profileImg = filename;
  }

  next();
 });
// // @route   post /api/v1/users
// exports.profilePhotoUploadCtrl =asyncHandler (async (req , res) =>{
//   //1 vaildation 
//   if (!req.file) {
//     return res.status(400).json({message: "no file provider"}) ;
//   }
  
//  //const  uploadUserImage = uploadSingleImage('profileImg');

  
//   ////2// get the path to img 
  
//   const imagePath = path.join(__dirname , `../imgs/${req.file}`) ; 

//   ////3//  upload to cloudinary 

//   const result = await cloudinaryUploadImage(imagePath) ;
//   console.log (result) ;

//   //////4
//   res.status(200).json({message: "success"}) ;
  
// })


// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = factory.getall(User);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUser = factory.getone(User);

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private/Admin
////////////exports.createUser = factory.createone(User);

exports.createUser = asyncHandler(async (req ,res) => {
  const user = await User.create(req.body) ;
  ////res.status(201) .json({data : newdocument}) ; 

  
  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });

 });

// // @desc    Update specific user
// // @route   PUT /api/v1/users/:id
// // @access  Private/Admin
// //  ubdate to all expect password
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
      weight: req.body.weight,
      height: req.body.height,
      old: req.body.old,
      gender: req.body.gender,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new apierror(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// // @desc    Update 4 user
// // @route   PUT /api/v1/users/:id
// // @access  Private/Admin
// //  ubdate 4
exports.updateUser2 = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      weight: req.body.weight,
      height: req.body.height,
      old: req.body.old,
      gender: req.body.gender,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new apierror(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = factory.deletone(User);




// // @desc    Get Logged user data
// // @route   GET /api/v1/users/getMe
// // @access  Private/Protect
// exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
//   req.params.id = req.user._id;
//   next();
// });