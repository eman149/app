const { validationResult } = require('express-validator');

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  next();   /// to go next step get category
};
// const validatorMiddleware1 = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   } 
//   else {
//     return res.status(204);
//   }
//   next();   /// to go next step get category
// };

module.exports = validatorMiddleware;
//module.exports = validatorMiddleware1;
