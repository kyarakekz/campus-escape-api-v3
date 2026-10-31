// A database rule was broken -> what the client should hear.
module.exports = {
  sessions_question_set_id_fkey: {
    status: 409,
    code: 'QUESTION_SET_IN_USE',
    message: 'Cannot delete a question set that is used by a session.',
  },
};