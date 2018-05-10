
module.exports = (sequelize, Datatypes) => {
  const orderDetails = sequelize.define('orderDetails', {
    orderId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Orders',
        key: 'id'
      },
    },
    mealId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Meals',
        key: 'id'
      },
    },
  }, {});
  orderDetails.associate = () => {
  };
  return orderDetails;
};

