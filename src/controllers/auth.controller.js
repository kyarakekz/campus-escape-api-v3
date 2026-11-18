const { matchedData } = require('express-validator');
const authService = require('../services/auth.service');

async function register(req, res) {
  const values = matchedData(req, { locations: ['body'] });
  const user = await authService.register(values);
  res.status(201).json({ user });
}

async function login(req, res) {
  const values = matchedData(req, { locations: ['body'] });
  const result = await authService.login(values.school_id, values.password);
  res.status(200).json(result);
}

async function me(req, res) {
  const user = authService.me(req.account);
  res.status(200).json({ user });
}

module.exports = { register, login, me };