const { matchedData } = require('express-validator');
const sessionService = require('../services/session.service');

async function createSession(req, res) {
  const { question_set_id: questionSetId } = matchedData(req, {
    locations: ['body'],
  });

  const session = await sessionService.createForUser(
    req.user.user_id,
    questionSetId
  );

  res.status(201).json({
    session: {
      session_id: session.session_id,
      question_set_id: session.question_set_id,
      join_code: session.join_code,
      status: session.status,
      duration_sec: session.duration_sec,
    },
  });
}

module.exports = { createSession };