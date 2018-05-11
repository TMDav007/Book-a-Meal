export default (sequelize) => {
  const order = sequelize.define('order', {

  }, {});
  order.associate = (models) => {
    // associations can be defined here
    order.belongsTo(models.user, {
      foreignkey: 'userId'
    });
    order.belongsToMany(models.meal, {
      foreignkey: 'orderId',
      through: 'orderdetails',
    });
  };
  return order;
};
