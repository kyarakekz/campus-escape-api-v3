const { body, param } = require('express-validator');

const questionSetIdRule = param('questionSetId')
  .isInt({ min: 1 })
  .withMessage('questionSetId must be a positive integer.')
  .toInt();

function titleRule() {
  return body('title')
    .exists()
    .withMessage('title is required.')
    .bail()
    .isString()
    .withMessage('title must be text.')
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage('title must be between 3 and 80 characters.');
}

function optionalTextRule(field, maxLength) {
  return body(field)
    .optional({ values: 'null' })
    .isString()
    .withMessage(`${field} must be text.`)
    .bail()
    .trim()
    .isLength({ max: maxLength })
    .withMessage(`${field} must be at most ${maxLength} characters.`);
}

const createQuestionSetRules = [
  titleRule(),
  optionalTextRule('description', 500),
  optionalTextRule('subject', 120),
  optionalTextRule('grade_level', 40),
];

const updateQuestionSetRules = [
  questionSetIdRule,
  titleRule().optional(),
  optionalTextRule('description', 500),
  optionalTextRule('subject', 120),
  optionalTextRule('grade_level', 40),
  body()
    .custom((value) => {
      const fields = Object.keys(value || {});
      return fields.some((field) =>
        ['title', 'description', 'subject', 'grade_level'].includes(field)
      );
    })
    .withMessage(
      'Send at least one field: title, description, subject, or grade_level.'
    ),
];

module.exports = {
  questionSetIdRule,
  createQuestionSetRules,
  updateQuestionSetRules,
};