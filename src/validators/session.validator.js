const { body, param } = require('express-validator');

const createSessionRules = [
  body('question_set_id')
    .isInt({ min: 1 })
    .withMessage('question_set_id must be a positive integer.')
    .toInt(),
];

const joinCodeRules = [
  param('code')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('code must be a six-digit join code.'),
];

const updateSessionStatusRules = [
  body('status')
    .isIn(['playing', 'ended'])
    .withMessage('status must be either playing or ended.'),
];

const joinSessionRules = [
  body('nickname')
    .isString()
    .withMessage('nickname must be text.')
    .bail()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('nickname must be between 2 and 20 characters.'),
];

module.exports = {
  createSessionRules,
  joinCodeRules,
  updateSessionStatusRules,
  joinSessionRules,
};
