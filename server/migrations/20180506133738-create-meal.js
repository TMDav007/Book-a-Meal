module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('meals', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    mealName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    amount: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('meals')
};
