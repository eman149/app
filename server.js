const express = require ('express');
const morgan = require('morgan');
const dotenv = require('dotenv') ;
dotenv.config({ path: 'config1.env' });
const globalerror = require ('./middlewares/errormiddleware.js');
const apierror = require('./utils/apierror') ;
const dbConnection = require('./config/database');
const { default: mongoose } = require('mongoose');
const categoryroutes = require('./routes/categryroutes') ;
const userroute  = require ('./routes/userroute.js') ;
const authroute  = require ('./routes/authroute.js') ;

const uploadPhoto = require('./uploadPhoto.js') ; 
const forget = require('./forget.js') ;
const User = require('./models/usermodel.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');


// Connect with db
dbConnection();

// express app
const app = express();

/// middleware
app.use(express.json()) ; ////convert json 

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
};



////////
//////////////foood
const axios = require('axios');

const APP_ID = 'c4062224'; // Replace with your actual App ID
const APP_KEY = 'f156f4ca08abf73d183849a65be6189e'; // Replace with your actual App Key

const searchFood = async (foodName) => {
  try {
    const response = await axios.get('https://api.edamam.com/api/nutrition-data', {
      params: {
        app_id: APP_ID,
        app_key: APP_KEY,
        ingr: foodName,
      },
    });

    const calories = response.data.calories;
    console.log(`Calories in ${foodName}: ${calories}`);
  } catch (error) {
    console.error('Error retrieving food data:', error);
  }
};



////////.env
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  // Enable debugging, logging, etc.
} else if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  // Optimize code, disable debugging, etc.
} else {
  console.log('NODE_ENV is not set, assuming development');
  // Set default behavior
}
///////////////////////////////////////////////////////

// const transporter = nodemailer.createTransport({
//   host: 'smtp.your-email-provider.com', // Replace with your SMTP server address
//   port: 587, // Or 465 for SSL/TLS
//   secure: false, // Set to true for port 465 (SSL/TLS)
//   auth: {
//     user: 'emanabdou506@gmail.com', // Replace with your email address
//     pass: 'emanlove2002' // Replace with your email password or App password
//   }
// });

// ///////// forget
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send('Email not found');
//     }

//     // Generate a random password reset token
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     const resetExpires = Date.now() + 3600000; // 1 hour from now

//     user.passwordResetToken = resetToken;
//     user.passwordResetExpires = resetExpires;
//     await user.save();

//     // Create a transport object for sending emails (replace with your email service details)
//     const transporter = nodemailer.createTransport({
//       // ... your email service configuration
//     });

//     // Send password reset email
//     const resetUrl = `http://localhost:8000/reset-password/${resetToken}`; // Replace with your frontend URL
//     const mailOptions = {
//       from: '"Your App Name" <your-email@example.com>',
//       to: email,
//       subject: 'Password Reset',
//       text: `You have requested a password reset for your account.\n\nClick on the following link to reset your password:\n${resetUrl}\n\nIf you did not request a password reset, please ignore this email.\n`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         return res.status(500).send('Error sending email');
//       }
//       console.log('Email sent:', info.response);
//       res.status(200).send('Password reset link sent to your email');
//     });

//   } catch (err) {
//     console.error('Error processing forgot password request:', err);
//     res.status(500).send('Error processing request');
//   }
// });


//app.use('uploadPhoto', uploadPhoto);

//// mount  routes
/// route to schema 
app.use("/api/v1/categories" , categoryroutes) ;
app.use("/api/v1/users" , userroute) ;
app.use("/api/v1/auth" , authroute) ;
app.use("/api/v1/uploadPhoto",  uploadPhoto) ;
//app.use("/api/v1/forget", forget) ;


app.all('*' , (req , res , next ) =>{
  /// create err and send it to err handling middleware 
  //  const err = new Error( ' can`t find this route : ${req.original url}') ;
  //  next(err.message) ;
  next ( new apierror("can`t find this route" , 400)) ;
}) ;  

//// global handling middleware 
app.use(globalerror) ;


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});



// Handle "error" rejection outside express
//events => list => callback fun 

process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);  /// shut down 
  });
});
