module.exports = {
  seats_session_nickname_unique: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this session.',
  },

  seats_session_user_unique: {
    status: 409,
    code: 'ALREADY_JOINED_SESSION',
    message: 'This account already has a seat in this session.',
  },
};