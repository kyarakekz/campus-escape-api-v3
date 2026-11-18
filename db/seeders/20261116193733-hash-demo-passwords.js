'use strict';

const password = require('../../src/security/password');

const LEGACY_PASSWORD_PLACEHOLDER = 'seed-only-placeholder';
const DEMO_PASSWORD = 'CampusDemo2026!';

module.exports = {
  async up(queryInterface) {
    const hash = await password.hash(DEMO_PASSWORD);

    // Turn the legacy placeholder into null so it can be replaced safely.
    await queryInterface.bulkUpdate(
      'users',
      { password_hash: null },
      { password_hash: LEGACY_PASSWORD_PLACEHOLDER }
    );

    // Give accounts without a real hash the shared demo password.
    await queryInterface.bulkUpdate(
      'users',
      { password_hash: hash },
      { password_hash: null }
    );
  },

  async down() {
    // Keep account hashes when undoing seed data.
  },
};