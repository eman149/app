const mongoose = require('mongoose');


//// create schema 
const  categoryschema = new mongoose.Schema({
    name : {
      type : String ,
      required : [true , 'required'] ,
      unique : [true , 'required'] ,
      maxlength : [32 , ' too long'] ,
    },
    slug : {
      type : String ,
      lowercase : true ,  
    },
    icon : String ,
    cals: {
      type: Number,
      trim: true,
      required: [true, 'calories required'],
    },
    protein: {
      type: Number,
      trim: true,
      required: [true, 'protein required'],
    },
    carb: {
      type: Number,
      trim: true,
      required: [true, 'carb required'],
    },
    fat: {
      type: Number,
      trim: true,
      required: [true, 'Fat required'],
    },
  } , 
  {timestamps : true}
) ;
  
  ////convert to model 
  const categorymodel = mongoose.model('category' , categoryschema) ;
  
  
  module.exports = categorymodel ;
  