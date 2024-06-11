const asyncHandler = require('express-async-handler');
const apierror = require('../utils/apierror');


exports.deletone = (model) => 
    asyncHandler (async (req , res , next) => {
        const { id } = req.params ;
      
        const document = await model.findOneAndDelete  (
          { _id : id} 
        ) 
        if (!document){
          // res.status(404).json({msg : 'no category in this id '}) ;
          return  next (new apierror ('no category for this id ' , 404 )) ;
        }
        res.status(204).send() ;
      });  
      


exports.updateone = (model) =>
    asyncHandler (async (req , res , next) => {
        const { id } = req.params ;
        const {name} = req.body ;
        const document = await model.findByIdAndUpdate(
          req.params.id , 
          req.body ,
          {new : true } 
        ) ;
        if (!document){
          // res.status(404).json({msg : 'no document in this id '}) ;
          return  next (new apierror (`no category for this id ${req.params.id }` , 404 )) ;
        }
        res.status(200).json({ data : document}) ;
      });  

exports.createone = (model) =>      
    asyncHandler(async (req ,res) => {
        const newdocument = await model.create(req.body) ;
        res.status(201) .json({data : newdocument}) ; 
      
       });


 exports.getone = (model)  =>
    asyncHandler (async (req , res , next ) => {
        const { id } = req.params ;
        const document = await model.findById(id) ;
        if (!document){
          // res.status(404).json({msg : 'no document in this id '}) ;
         return  next (new apierror ('no document for this id ' , 404 )) ;
        }
        res.status(200).json({ data : document}) ;
      });       


exports.getall = (model)  =>
    asyncHandler (async (req , res ) => {
        // const name = req.body.name ;
        // console.log(req.body) ;
        // const page =  res.query.page * 1 || 1 ;
        // const limit = req.query.limit *1 || 5 ;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1 ) * limit ;
        const documents = await model.find({}).skip(skip).limit(limit) ; 
        res.status(200).json({results :documents.length , page ,  data: documents}) ;
      } ) ;
          