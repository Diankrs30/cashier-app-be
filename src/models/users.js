'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    saldo: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    status: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    reset_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};