'use strict';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    userid: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    name: DataTypes.STRING,
    username: { type: DataTypes.STRING, allowNull: false },
    email:  { type: DataTypes.STRING,  allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  },{
    timestamps: false
  });

  return users;
}