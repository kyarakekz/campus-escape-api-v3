const { Router } = require('express');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');
const controller = require('../controllers/session.controller');
const {
  createSessionRules,
  joinCodeRules,
  updateSessionStatusRules,
  joinSessionRules,
} = require('../validators/session.validator');

const router = Router();

router.post(
  '/',
  requireUser('host'),
  createSessionRules,
  validate,
  controller.createSession
);

router.get(
  '/:code',
  joinCodeRules,
  validate,
  controller.getSession
);

router.patch(
  '/:code',
  requireUser('host'),
  joinCodeRules,
  updateSessionStatusRules,
  validate,
  controller.updateSessionStatus
);

router.post(
  '/:code/players',
  requireUser(),
  joinCodeRules,
  joinSessionRules,
  validate,
  controller.joinSession
);

module.exports = router;