
module.exports = (sequelize, Datatypes) => {
  const menudetails = sequelize.define('menudetails', {
    mealId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'meals',
        key: 'id'
      },
    },
    menuId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'menus',
        key: 'id'
      },
    },
  }, {});
  menudetails.associate = function () {
    //
  };
  return menudetails;
};
