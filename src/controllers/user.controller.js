const { matchedData } = require('express-validator');
const userService = require('../services/user.service');

function publicUser(user) {
  const result = user.toJSON();
  delete result.password_hash;
  return result;
}

async function listUsers(req, res) {
  const users = await userService.listUsers();
  res.status(200).json({ users: users.map(publicUser) });
}

async function changeRole(req, res) {
  const { id } = matchedData(req, { locations: ['params'] });
  const { role } = matchedData(req, { locations: ['body'] });

  const user = await userService.changeRole(id, role, req.user.user_id);
  res.status(200).json({ user: publicUser(user) });
}

module.exports = { listUsers, changeRole };