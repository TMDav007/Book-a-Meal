export default (sequelize) => {
  const Order = sequelize.define('Order', {

  }, {});
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignkey: 'userId'
    });
    Order.belongsToMany(models.Meal, {
      foreignkey: 'orderId',
      through: 'orderDetails',
    });
  };
  return Order;
};
