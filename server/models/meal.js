export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: false,
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
    Meal.belongsTo(models.Order, {
      foreign: 'orderId'
    });
    Meal.belongsTo(models.User, {
      foreign: 'userId'
    });
    Meal.belongsToMany(models.Menu, {
      through: 'menuDetails',
      foreignKey: 'mealId',
    });
  };
  return Meal;
};
