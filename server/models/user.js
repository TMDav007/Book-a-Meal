export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      Unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin']
    },
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Order, {
      foreignKey: 'userId',
    });
  };
  return User;
};
