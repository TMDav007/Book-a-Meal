export default (sequelize) => {
  const Order = sequelize.define('Order', {}, {});
  Order.associate = (models) => {
    // associations can be defined here
    Order.hasMany(models.Meal, {
      foreignkey: 'orderId'
    });
    Order.belongsTo(models.User, {
      foreignkey: 'userId'
    });
  };
  return Order;
};
