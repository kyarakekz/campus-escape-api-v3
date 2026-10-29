const { body } = require('express-validator');

const createSessionRules = [
  body('question_set_id')
    .isInt({ min: 1 })
    .withMessage('question_set_id must be a positive integer.')
    .toInt(),
];

module.exports = { createSessionRules };