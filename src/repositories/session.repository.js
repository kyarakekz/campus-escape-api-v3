const { Session } = require('../models');

function findByJoinCode(joinCode) {
  return Session.findOne({ where: { join_code: joinCode } });
}

function create(values) {
  return Session.create(values);
}

module.exports = {
  findByJoinCode,
  create,
};