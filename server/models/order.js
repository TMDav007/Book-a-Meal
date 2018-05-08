export default (sequelize) => {
  const Order = sequelize.define('Order', {}, {});
  Order.associate = () => {
    // associations can be defined here
  };
  return Order;
};
