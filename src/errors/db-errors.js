// Reads the name of the database constraint that an insert, update or delete broke.
// Returns null when the error is not a constraint violation.
const { UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

const POSTGRES_CONSTRAINT_CODES = new Set([
  '23001', // restrict violation
  '23502', // not-null violation
  '23503', // foreign-key violation
  '23505', // unique violation 
]);

function constraintOf(error) {
  const parent = error.parent || error.original || error;
  const code = parent.code || error.code;

  const isSequelizeConstraintError =
    error instanceof UniqueConstraintError ||
    error instanceof ForeignKeyConstraintError;

  if (!isSequelizeConstraintError && !POSTGRES_CONSTRAINT_CODES.has(code)) {
    return null;
  }

  return parent.constraint || error.constraint || error.index || 'unknown';
}

module.exports = { constraintOf };