
const express = require('express') ;
const {getcategoryvalidator ,
    createcategorycalidator ,
    updatecategorycalidator , 
    deletecategorycalidator } 
= require('../utils/validators/categoryvalidator') ;
const { getgategory ,
        getgategor ,
        updategategor,
        createcategory,
        deletegategor}

 = require('../services/categryservice');

const router = express.Router() ;





router.route('/' )
 .get(getgategory) .post(createcategorycalidator, createcategory);
router.route("/:id" )
.get(getcategoryvalidator,  getgategor) 
.put( updatecategorycalidator, updategategor)
.delete(deletecategorycalidator ,deletegategor);

module.exports = router ;