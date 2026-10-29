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

async function getSession(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const session = await sessionService.getByJoinCode(code);

  res.json({
    session: {
      session_id: session.session_id,
      question_set_id: session.question_set_id,
      join_code: session.join_code,
      status: session.status,
      duration_sec: session.duration_sec,
      started_at: session.started_at,
      ended_at: session.ended_at,
    },
  });
}

async function updateSessionStatus(req, res) {
  const { code, status } = matchedData(req, {
    locations: ['params', 'body'],
  });

  const session = await sessionService.changeStatus(
    req.user.user_id,
    code,
    status
  );

  res.json({
    session: {
      session_id: session.session_id,
      question_set_id: session.question_set_id,
      join_code: session.join_code,
      status: session.status,
      duration_sec: session.duration_sec,
      started_at: session.started_at,
      ended_at: session.ended_at,
    },
  });
}

async function joinSession(req, res) {
  const { code, nickname } = matchedData(req, {
    locations: ['params', 'body'],
  });

  const result = await sessionService.joinByCode(
    req.user.user_id,
    code,
    nickname
  );

  res.status(result.isNew ? 201 : 200).json({
    seat: {
      seat_id: result.seat.seat_id,
      session_id: result.seat.session_id,
      nickname: result.seat.nickname,
      score: result.seat.score,
      current_stage: result.seat.current_stage,
      completed: result.seat.completed,
    },
  });
}

module.exports = {
  createSession,
  getSession,
  updateSessionStatus,
  joinSession,
};