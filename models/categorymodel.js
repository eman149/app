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
    image : String ,
  } , 
  {timestamps : true}
) ;
  
  ////convert to model 
  const categorymodel = mongoose.model('category' , categoryschema) ;
  
  
  module.exports = categorymodel ;
  