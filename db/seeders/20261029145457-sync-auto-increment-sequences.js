'use strict';

const tables = [
  ['users', 'user_id'],
  ['question_sets', 'question_set_id'],
  ['questions', 'question_id'],
  ['sessions', 'session_id'],
  ['seats', 'seat_id'],
  ['answers', 'answer_id'],
  ['reward_claims', 'reward_claim_id'],
];

module.exports = {
  async up(queryInterface) {
    for (const [table, column] of tables) {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('${table}', '${column}'),
          COALESCE(MAX("${column}"), 1),
          COUNT(*) > 0
        )
        FROM "${table}"
      `);
    }
  },

  async down() {},
};