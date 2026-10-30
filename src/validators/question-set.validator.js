const { body, param } = require('express-validator');

const questionSetIdRule = param('questionSetId')
  .isInt({ min: 1 })
  .withMessage('questionSetId must be a positive integer.');

const optionalText = (field, maxLength) =>
  body(field)
    .optional({ nullable: true })
    .isString()
    .withMessage(`${field} must be text.`)
    .bail()
    .isLength({ max: maxLength })
    .withMessage(`${field} must be at most ${maxLength} characters.`);

const createQuestionSetRules = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage('title must be between 3 and 80 characters.'),
  optionalText('description', 500),
  optionalText('subject', 120),
  optionalText('grade_level', 40),
];

const hasUpdateFieldRule = param('questionSetId').custom((_, { req }) => {
  const editableFields = ['title', 'description', 'subject', 'grade_level'];
  const hasEditableField = editableFields.some((field) =>
    Object.prototype.hasOwnProperty.call(req.body || {}, field)
  );

  if (!hasEditableField) {
    throw new Error(
      'Send at least one field: title, description, subject, or grade_level.'
    );
  }

  return true;
});

const updateQuestionSetRules = [
  questionSetIdRule,
  hasUpdateFieldRule,
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage('title must be between 3 and 80 characters.'),
  optionalText('description', 500),
  optionalText('subject', 120),
  optionalText('grade_level', 40),
];

module.exports = {
  questionSetIdRule,
  createQuestionSetRules,
  updateQuestionSetRules,
};