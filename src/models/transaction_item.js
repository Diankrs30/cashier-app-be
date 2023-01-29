'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction_item.hasOne(models.products, {
        sourceKey: 'id_product',
        foreignKey: 'id',
        as: 'product'
      })
      transaction_item.belongsTo(models.transaction, {
        sourceKey: 'id',
        foreignKey: 'id_transaction',
        as: 'transaction'
      })
    }
  }
  transaction_item.init({
    id_transaction: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction_item',
  });
  return transaction_item;
};