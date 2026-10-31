module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'QuestionSet',
    {
      question_set_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      grade_level: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
    },
    {
      tableName: 'question_sets',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );