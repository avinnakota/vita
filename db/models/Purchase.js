module.exports = function(sequelize, DataTypes) {
  return sequelize.define("purchases", {
    amount: DataTypes.DECIMAL(10, 2)

    // timeStamp: {
    //   type: DataTypes.DATE, defaultValue: DataTypes.NOW
    // }
    // other purchase information obtained from purchase process
  })
}