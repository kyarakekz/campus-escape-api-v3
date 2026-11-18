// A database rule was broken -> what the client should hear.
module.exports = {
  sessions_question_set_id_fkey: {
    status: 409,
    code: 'QUESTION_SET_IN_USE',
    message: 'Cannot delete a question set that is used by a session.',
  },
  users_school_id_key: {
    status: 409,
    code: 'SCHOOL_ID_TAKEN',
    message: 'An account with this school ID already exists.',
  },
  users_email_key: {
    status: 409,
    code: 'EMAIL_TAKEN',
    message: 'An account with this email already exists.',
  },
};