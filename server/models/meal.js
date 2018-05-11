export default (sequelize, DataTypes) => {
  const meal = sequelize.define('meal', {
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  meal.associate = (models) => {
    // associations can be defined here
    meal.belongsToMany(models.order, {
      foreignKey: 'mealId',
      through: models.orderdetails
    });
    meal.belongsTo(models.user, {
      foreignKey: 'userid'
    });
    meal.belongsToMany(models.menu, {
      foreignKey: 'mealId',
      through: models.menudetails,
    });
  };
  return meal;
};
