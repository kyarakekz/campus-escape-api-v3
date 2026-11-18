const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const requireUser = require('../middlewares/require-user');
const {
  registerRules,
  loginRules,
} = require('../validators/auth.validator');

const router = Router();

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);
router.get('/me', requireUser(), authController.me);

module.exports = router;