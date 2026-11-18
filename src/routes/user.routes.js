const { Router } = require('express');
const { param } = require('express-validator');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const requireUser = require('../middlewares/require-user');
const { roleRules } = require('../validators/auth.validator');

const router = Router();

router.use(requireUser('ADMIN'));

router.get('/', userController.listUsers);

router.patch(
  '/:id/role',
  param('id')
    .isInt({ min: 1 })
    .withMessage('id must be a positive integer.'),
  roleRules,
  validate,
  userController.changeRole
);
module.exports = router;

