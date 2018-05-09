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
    Menu.belongsToMany(models.Meal, {
      through: 'menuDetails',
      foreignKey: 'menuId',
    });
  };
  return Menu;
};
