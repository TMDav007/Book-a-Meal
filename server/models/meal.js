export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
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
  Meal.associate = (models) => {
    // associations can be defined here
    Meal.belongsToMany(models.Order, {
      through: 'orderMeal'
    });
    Meal.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Meal.belongsToMany(models.Menu, {
      through: 'menuDetails',
      foreignKey: 'mealId',
    });
  };
  return Meal;
};
