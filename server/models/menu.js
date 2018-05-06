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
    Menu.hasMany(models.Meals, {
      foreignKey: 'menuId',
    });
    Menu.hasMany(models.Orders, {
      foreignKey: 'menuId',
    });
  };
  return Menu;
};
