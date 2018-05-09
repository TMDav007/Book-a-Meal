
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Menudetails', {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    mealId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    menuId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  }),

  down: queryInterface => queryInterface.dropTable('MenuDetails')

};
