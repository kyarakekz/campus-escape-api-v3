const { body } = require('express-validator');

const registerRules = [
  body('school_id')
    .isString()
    .withMessage('school_id must be text.')
    .bail()
    .trim()
    .matches(/^\d{4}-\d{4}$/)
    .withMessage('school_id must use the format 0000-0000.'),

  body('full_name')
    .isString()
    .withMessage('full_name must be text.')
    .bail()
    .trim()
    .isLength({ min: 1, max: 120 })
    .withMessage('full_name must be between 1 and 120 characters.'),

  body('email')
    .isString()
    .withMessage('email must be text.')
    .bail()
    .trim()
    .isEmail()
    .withMessage('email must be valid.')
    .bail()
    .isLength({ max: 255 })
    .withMessage('email must be at most 255 characters.'),

  body('password')
    .isString()
    .withMessage('password must be text.')
    .bail()
    .isLength({ min: 8, max: 72 })
    .withMessage('password must be 8 to 72 characters.')
    .bail()
    .matches(/[A-Za-z]/)
    .withMessage('password must contain a letter.')
    .bail()
    .matches(/[0-9]/)
    .withMessage('password must contain a number.'),
];

const loginRules = [
  body('school_id')
    .exists()
    .withMessage('school_id is required.')
    .bail()
    .isString()
    .withMessage('school_id must be text.'),

  body('password')
    .exists()
    .withMessage('password is required.')
    .bail()
    .isString()
    .withMessage('password must be text.'),
];

const roleRules = [
  body('role')
    .isIn(['PLAYER', 'HOST', 'ADMIN'])
    .withMessage('role must be PLAYER, HOST, or ADMIN.'),
];

module.exports = { registerRules, loginRules, roleRules };