
const router = require('express').Router();

const dotenv = require('dotenv') ;
dotenv.config({ path: 'config1.env' });
const User = require('./models/usermodel');
const asyncHandler = require('express-async-handler');
const apierror = require('./utils/apierror');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');




router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Email not found');
    }

    // Generate a random password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetExpires = Date.now() + 3600000; // 1 hour from now

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    // Create a transport object for sending emails (replace with your email service details)
    const transporter = nodemailer.createTransport({
      // ... your email service configuration
    });

    // Send password reset email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`; // Replace with your frontend URL
    const mailOptions = {
      from: '"Your App Name" <your-email@example.com>',
      to: email,
      subject: 'Password Reset',
      text: `You have requested a password reset for your account.\n\nClick on the following link to reset your password:\n${resetUrl}\n\nIf you did not request a password reset, please ignore this email.\n`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent:', info.response);
      res.status(200).send('Password reset link sent to your email');
    });

  } catch (err) {
    console.error('Error processing forgot password request:', err);
    res.status(500).send('Error processing request');
  }
});


  
      


  
module.exports = router;