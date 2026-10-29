const { Seat } = require('../models');

function findBySessionAndUser(sessionId, userId) {
  return Seat.findOne({
    where: {
      session_id: sessionId,
      user_id: userId,
    },
  });
}

function create(values) {
  return Seat.create(values);
}

module.exports = {
  findBySessionAndUser,
  create,
};