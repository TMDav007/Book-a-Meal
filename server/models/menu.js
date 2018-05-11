export default (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  menu.associate = (models) => {
    // associations can be defined here
    menu.belongsToMany(models.meal, {
      through: 'menudetails',
      foreignKey: 'menuId',
    });
  };
  return menu;
};
