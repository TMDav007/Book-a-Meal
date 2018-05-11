
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('menudetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    mealId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    menuId: {
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
  down: queryInterface => queryInterface.dropTable('menudetails')
};
