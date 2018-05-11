
module.exports = (sequelize, Datatypes) => {
  const orderdetails = sequelize.define('orderdetails', {
    orderId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'orders',
        key: 'id'
      },
    },
    mealId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'meals',
        key: 'id'
      },
    },
  }, {});
  orderdetails.associate = function () {
    // associations can be defined here
  };
  return orderdetails;
};
