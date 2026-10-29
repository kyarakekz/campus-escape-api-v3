const { Router } = require('express');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');
const controller = require('../controllers/session.controller');
const { createSessionRules } = require('../validators/session.validator');

const router = Router();

router.post(
  '/',
  requireUser('host'),
  createSessionRules,
  validate,
  controller.createSession
);

module.exports = router;