const slugify = require ('slugify') ;
const asyncHandler = require('express-async-handler') ;
const categorymodel = require ('../models/categorymodel')
const factory = require ("./handlersfactory.js") ;
const apierror = require ('../utils/apierror.js') ;

////  @doc get list gategory
////  @route get  /api/v1/category
////  @access  private
exports.getgategory= factory.getall(categorymodel) ;

//// @doc  get specific category
//// @route post  /api/v1/categories/ : id
//// @access  public

exports.getgategor= factory.getone(categorymodel) ;



//// async await 
//// @doc  create category
//// @route post  /api/v1/category
//// @access  private
 exports.createcategory = factory.createone(categorymodel);


//// @doc  update specific category
//// @route put  /api/v1/categories/ : id
//// @access  private 

exports.updategategor= factory.updateone(categorymodel) ;
//// @doc  delete specific category
//// @route put  /api/v1/categories/ : id
//// @access  private 
exports.deletegategor = factory.deletone(categorymodel) ;






















 /// categorymodel.create({name , slug : slugify(name)}) 
  ///// promise 
  // .then((category )=> res.status(201) .json({data : category}))
  // .catch((err)=> res.status(400).send(err)) ;
  // const newgategory = new categorymodel({name}) ;
  // newgategory
  // .save()
  // .then((doc) => {
  //   res.json(doc) ;
  // })
  // .catch((err) => {
  //   res.json(err)
  // });

 
