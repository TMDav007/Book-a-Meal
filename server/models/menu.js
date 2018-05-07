export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Menu.associate = (models) => {
    // associations can be defined here
    Menu.hasMany(models.Meal, {
      foreignKey: 'menuId',
    });
    Menu.hasMany(models.Order, {
      foreignKey: 'menuId',
    });
  };
  return Menu;
};
