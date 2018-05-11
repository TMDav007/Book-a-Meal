

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orderdetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    orderId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    mealId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
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
  down: queryInterface => queryInterface.dropTable('orderdetails')
};
