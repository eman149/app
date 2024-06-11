const slugify = require('slugify');
const { check  , body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatormiddleware');

exports.getcategoryvalidator = [
  check('id').isMongoId().withMessage('Invalid category id format '),
  validatorMiddleware,
];



exports.createcategorycalidator = [
  check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name')
     .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updatecategorycalidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deletecategorycalidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

