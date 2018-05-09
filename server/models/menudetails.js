
module.exports = (sequelize, Datatypes) => {
  const menuDetails = sequelize.define('menuDetails', {
    mealId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Meals',
        key: 'id'
      },
    },
    menuId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Menus',
        key: 'id'
      },
    },
  }, {});
  menuDetails.associate = function () {
    // associations can be defined here
    // menuDetails.hasMany(models.Meal, {
    //   foreignKey: 'mealId',
    // });
    // menuDetails.hasMany(models.Menu, {
    //   foreignKey: 'menuId',
    // });
  };
  return menuDetails;
};
