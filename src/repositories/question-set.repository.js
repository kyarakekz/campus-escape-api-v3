const { QuestionSet } = require('../models');

function findAllByUserId(userId) {
  return QuestionSet.findAll({
    where: { user_id: userId },
    order: [['created_at', 'DESC']],
  });
}

function findById(questionSetId) {
  return QuestionSet.findByPk(questionSetId);
}

function create(values) {
  return QuestionSet.create(values);
}

async function update(questionSet, values) {
  await questionSet.update(values);
  return questionSet;
}

function remove(questionSet) {
  return questionSet.destroy();
}

module.exports = {
  findAllByUserId,
  findById,
  create,
  update,
  remove,
};