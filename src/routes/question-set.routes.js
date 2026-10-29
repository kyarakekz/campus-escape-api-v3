const { Router } = require('express');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');
const controller = require('../controllers/question-set.controller');
const {
  questionSetIdRule,
  createQuestionSetRules,
  updateQuestionSetRules,
} = require('../validators/question-set.validator');

const router = Router();

router.get('/', requireUser('host'), controller.listQuestionSets);

router.post(
  '/',
  requireUser('host'),
  createQuestionSetRules,
  validate,
  controller.createQuestionSet
);

router.get(
  '/:questionSetId',
  requireUser('host'),
  questionSetIdRule,
  validate,
  controller.getQuestionSet
);

router.put(
  '/:questionSetId',
  requireUser('host'),
  updateQuestionSetRules,
  validate,
  controller.updateQuestionSet
);

router.delete(
  '/:questionSetId',
  requireUser('host'),
  questionSetIdRule,
  validate,
  controller.deleteQuestionSet
);

module.exports = router;