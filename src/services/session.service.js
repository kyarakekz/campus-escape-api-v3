const { randomInt } = require('crypto');
const questionSetRepository = require('../repositories/question-set.repository');
const sessionRepository = require('../repositories/session.repository');
const { badRequest, forbidden, conflict } = require('../errors/app-error');

async function createForUser(userId, questionSetId) {
  const questionSet = await questionSetRepository.findById(questionSetId);

  if (!questionSet) {
    throw badRequest('INVALID_QUESTION_SET', 'Question set does not exist.');
  }

  if (String(questionSet.user_id) !== String(userId)) {
    throw forbidden('You can only start a session with your own question set.');
  }

  // Generate six digits with no leading zero; retry if the code already exists.
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const joinCode = String(randomInt(100000, 1000000));
    const existing = await sessionRepository.findByJoinCode(joinCode);

    if (!existing) {
      return sessionRepository.create({
        question_set_id: questionSetId,
        join_code: joinCode,
        status: 'waiting',
        duration_sec: 360,
      });
    }
  }

  throw conflict(
    'JOIN_CODE_UNAVAILABLE',
    'Could not generate a unique session code. Try again.'
  );
}

module.exports = { createForUser };