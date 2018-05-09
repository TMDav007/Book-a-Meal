export default (sequelize) => {
  const Order = sequelize.define('Order', {}, {});
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsToMany(models.Meal, {
      through: 'orderMeal'
    });
    Order.belongsTo(models.User, {
      foreignkey: 'userId'
    });
  };
  return Order;
};
