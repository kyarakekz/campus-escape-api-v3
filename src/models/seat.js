module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Seat',
    {
      seat_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      session_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      current_stage: {
        type: DataTypes.ENUM('campus', 'computer_lab', 'ccb', 'ict', 'gate'),
        allowNull: false,
        defaultValue: 'campus',
      },
      time_penalty_sec: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      token_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'seats',
      timestamps: false,
    }
  );