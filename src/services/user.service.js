const userRepository = require('../repositories/user.repository');
const { conflict, notFound } = require('../errors/app-error');

function listUsers() {
  return userRepository.findAll();
}

async function changeRole(userId, role, actorId) {
  if (String(userId) === String(actorId)) {
    throw conflict(
      'CANNOT_CHANGE_OWN_ROLE',
      'An admin cannot change their own role.'
    );
  }

  const user = await userRepository.findById(userId);

  if (!user) {
    throw notFound('USER_NOT_FOUND', 'User not found.');
  }

  return userRepository.update(user, { role });
}

module.exports = { listUsers, changeRole };