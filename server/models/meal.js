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
  Meal.associate = () => {
    // associations can be defined here
  };
  return Meal;
};
