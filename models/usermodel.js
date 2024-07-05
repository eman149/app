const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name required'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,

    imageUrl: String ,
    userId: String,
    
    gender: {
      type: String,
      trim: true,
    ///  required: [true, 'gender required'],
    },
    weight: {
      type: Number,
      trim: true,
     // required: [true, 'weight required'],
    },
    height: {
      type: Number,
      trim: true,
      //required: [true, 'height required'],
    },
    old: {
      type: Number,
      trim: true,
     // required: [true, 'old required'],
    },
    password: {
      type: String,
      required: [true, 'password required'],
      minlength: [6, 'Too short password'],
    },
    passwordChangedAt: Date,
    
    passwordResetCode: String,


    passwordResetExpires: Date,
    passwordResetToken :String ,

    
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    // child reference (one to many)
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
    // addresses: [
    //   {
    //     id: { type: mongoose.Schema.Types.ObjectId },
    //     alias: String,
    //     details: String,
    //     phone: String,
    //     city: String,
    //     postalCode: String,
    //   },
    // ],
  },
  { timestamps: true }
);
/// hashing l passwored

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

 const User = mongoose.model('User', userSchema);

module.exports = User;
