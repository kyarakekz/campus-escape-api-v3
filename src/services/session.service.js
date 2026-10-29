const { randomInt } = require('crypto');
const questionSetRepository = require('../repositories/question-set.repository');
const sessionRepository = require('../repositories/session.repository');
const seatRepository = require('../repositories/seat.repository');
const {
  badRequest,
  forbidden,
  conflict,
  notFound,
} = require('../errors/app-error');

async function createForUser(userId, questionSetId) {
  const questionSet = await questionSetRepository.findById(questionSetId);

  if (!questionSet) {
    throw badRequest('INVALID_QUESTION_SET', 'Question set does not exist.');
  }

  if (String(questionSet.user_id) !== String(userId)) {
    throw forbidden('You can only start a session with your own question set.');
  }

  // Generate a six-digit code and retry if it is already in use.
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

async function getByJoinCode(joinCode) {
  const session = await sessionRepository.findByJoinCode(joinCode);

  if (!session) {
    throw notFound('SESSION_NOT_FOUND', 'Session does not exist.');
  }

  return session;
}

async function changeStatus(userId, joinCode, newStatus) {
  const session = await getByJoinCode(joinCode);
  const questionSet = await questionSetRepository.findById(
    session.question_set_id
  );

  if (String(questionSet.user_id) !== String(userId)) {
    throw forbidden('You can only change a session you created.');
  }

  const allowedTransitions = {
    waiting: ['playing', 'ended'],
    playing: ['ended'],
    ended: [],
  };

  if (!allowedTransitions[session.status].includes(newStatus)) {
    throw conflict(
      'INVALID_STATUS_TRANSITION',
      `A session cannot change from ${session.status} to ${newStatus}.`
    );
  }

  const changes = { status: newStatus };

  if (newStatus === 'playing') {
    changes.started_at = new Date();
  }

  if (newStatus === 'ended') {
    changes.ended_at = new Date();
  }

  await session.update(changes);
  return session;
}

async function joinByCode(userId, joinCode, nickname) {
  const session = await getByJoinCode(joinCode);

  // Check for an existing seat first, so a returning account can reclaim it
  // even after the session has started.
  const existingSeat = await seatRepository.findBySessionAndUser(
    session.session_id,
    userId
  );

  if (existingSeat) {
    return { seat: existingSeat, isNew: false };
  }

  if (session.status !== 'waiting') {
    throw conflict(
      'SESSION_ALREADY_STARTED',
      'You cannot join because this session has already started.'
    );
  }

  const seat = await seatRepository.create({
    session_id: session.session_id,
    user_id: userId,
    nickname,
  });

  return { seat, isNew: true };
}

module.exports = {
  createForUser,
  getByJoinCode,
  changeStatus,
  joinByCode,
};