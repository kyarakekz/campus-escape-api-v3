const password = require('../security/password');
const token = require('../security/token');
const env = require('../config/env');
const userRepository = require('../repositories/user.repository');
const { unauthorized } = require('../errors/app-error');

function publicUser(user) {
  const result = user.toJSON();
  delete result.password_hash;
  return result;
}

async function register(data) {
  const passwordHash = await password.hash(data.password);

  const user = await userRepository.create({
    school_id: data.school_id,
    full_name: data.full_name,
    email: data.email,
    role: 'PLAYER',
    password_hash: passwordHash,
  });

  return publicUser(user);
}

async function login(schoolId, plainPassword) {
  const user = await userRepository.findForLogin(schoolId);
  const valid = await password.matches(
    plainPassword,
    user ? user.password_hash : null
  );

  if (!valid) {
    throw unauthorized('Invalid school ID or password.', 'INVALID_CREDENTIALS');
  }

  return {
    token: token.issue(user),
    token_type: 'Bearer',
    expires_in: env.jwt.expiresIn,
    user: publicUser(user),
  };
}

function me(user) {
  return publicUser(user);
}

module.exports = { register, login, me };