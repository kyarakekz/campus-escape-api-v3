'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 5,
        full_name: 'Demo Host Two',
        role: 'host',
        school_id: '2099-3004',
        email: 'host2@example.test',
        password_hash: 'seed-only-placeholder',
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { school_id: '2099-3004' }, {});
  },
};