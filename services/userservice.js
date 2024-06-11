const asyncHandler = require('express-async-handler');
//const { v4: uuidv4 } = require('uuid');
//const sharp = require('sharp');
const bcrypt = require('bcrypt');

const factory = require('./handlersfactory');
const apierror = require('../utils/apierror');
//const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
//const createToken = require('../utils/createToken');
const User = require('../models/usermodel');

// // Upload single image
// exports.uploadUserImage = uploadSingleImage('profileImg');

// // Image processing
// exports.resizeImage = asyncHandler(async (req, res, next) => {
//   const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

//   if (req.file) {
//     await sharp(req.file.buffer)
//       .resize(600, 600)
//       .toFormat('jpeg')
//       .jpeg({ quality: 95 })
//       .toFile(`uploads/users/${filename}`);

//     // Save image into our db
//     req.body.profileImg = filename;
//   }

//   next();
// });

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
exports.createUser = factory.createone(User);

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