'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.hasMany(models.transaction_item, {
        sourceKey: 'id',
        foreignKey: 'id_transaction',
        as: 'transaction_item'
      })
    }
  }
  transaction.init({
    id_user: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};