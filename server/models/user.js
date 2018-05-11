export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
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
  user.associate = (models) => {
    // associations can be defined here
    user.hasMany(models.meal, {
      foreignKey: 'userId',
    });
    user.hasMany(models.order, {
      foreignKey: 'userId',
    });
  };
  return user;
};
