module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Session',
    {
      session_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question_set_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      join_code: {
        type: DataTypes.CHAR(6),
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('waiting', 'playing', 'ended'),
        allowNull: false,
        defaultValue: 'waiting',
      },
      duration_sec: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 360,
      },
      started_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ended_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'sessions',
      timestamps: false,
    }
  );