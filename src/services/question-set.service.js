const questionSetRepository = require('../repositories/question-set.repository');
const { forbidden, notFound } = require('../errors/app-error');

function listForUser(userId) {
  return questionSetRepository.findAllByUserId(userId);
}

async function getForUser(questionSetId, userId) {
  const questionSet = await questionSetRepository.findById(questionSetId);

  if (!questionSet) {
    throw notFound('QUESTION_SET_NOT_FOUND', 'Question set not found.');
  }

  if (String(questionSet.user_id) !== String(userId)) {
    throw forbidden('You can only access your own question sets.');
  }

  return questionSet;
}

function createForUser(userId, values) {
  return questionSetRepository.create({
    ...values,
    user_id: userId,
  });
}

async function updateForUser(questionSetId, userId, values) {
  const questionSet = await getForUser(questionSetId, userId);
  return questionSetRepository.update(questionSet, values);
}

async function deleteForUser(questionSetId, userId) {
  const questionSet = await getForUser(questionSetId, userId);
  await questionSetRepository.remove(questionSet);
}

module.exports = {
  listForUser,
  getForUser,
  createForUser,
  updateForUser,
  deleteForUser,
};