const { matchedData } = require('express-validator');
const questionSetService = require('../services/question-set.service');

function toJson(questionSet) {
  return {
    question_set_id: questionSet.question_set_id,
    user_id: questionSet.user_id,
    title: questionSet.title,
    description: questionSet.description,
    subject: questionSet.subject,
    grade_level: questionSet.grade_level,
    created_at: questionSet.created_at,
  };
}

async function listQuestionSets(req, res) {
  const questionSets = await questionSetService.listForUser(req.user.user_id);
  res.status(200).json({ question_sets: questionSets.map(toJson) });
}

async function getQuestionSet(req, res) {
  const { questionSetId } = matchedData(req, { locations: ['params'] });
  const questionSet = await questionSetService.getForUser(
    questionSetId,
    req.user.user_id
  );
  res.status(200).json({ question_set: toJson(questionSet) });
}

async function createQuestionSet(req, res) {
  const values = matchedData(req, { locations: ['body'] });
  const questionSet = await questionSetService.createForUser(
    req.user.user_id,
    values
  );
  res.status(201).json({ question_set: toJson(questionSet) });
}

async function updateQuestionSet(req, res) {
  const { questionSetId } = matchedData(req, { locations: ['params'] });
  const values = matchedData(req, { locations: ['body'] });
  const questionSet = await questionSetService.updateForUser(
    questionSetId,
    req.user.user_id,
    values
  );
  res.status(200).json({ question_set: toJson(questionSet) });
}

async function deleteQuestionSet(req, res) {
  const { questionSetId } = matchedData(req, { locations: ['params'] });
  await questionSetService.deleteForUser(questionSetId, req.user.user_id);
  res.status(204).end();
}

module.exports = {
  listQuestionSets,
  getQuestionSet,
  createQuestionSet,
  updateQuestionSet,
  deleteQuestionSet,
};