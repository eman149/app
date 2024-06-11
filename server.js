const express = require ('express');
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' });
const globalerror = require ('./middlewares/errormiddleware.js')
const apierror = require('./utils/apierror') ;
const dbConnection = require('./config/database');
const { default: mongoose } = require('mongoose');
const categoryroutes = require('./routes/categryroutes') ;
const userroute  = require ('./routes/userroute.js') ;
const authroute  = require ('./routes/authroute.js') ;




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






//// mount  routes
/// route to schema 
app.use("/api/v1/categories" , categoryroutes) ;
app.use("/api/v1/users" , userroute) ;
app.use("/api/v1/auth" , authroute) ;

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
