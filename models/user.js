'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    firstname: {type: DataTypes.STRING, allowNull: false},
    lastname: DataTypes.STRING,
    country: DataTypes.STRING,
    isAbove18: {type:DataTypes.BOOLEAN, defaultValue: false, validate: {is: true}},
    emailId: {type: DataTypes.STRING, allowNull: false,unique: true, validate: {isEmail: {args:true, msg: "Email Id is invalid!"}}},
    password: {type: DataTypes.STRING, allowNull: false},
    referralId: {type: DataTypes.STRING, allowNull: true},
    wallet:{ type:DataTypes.FLOAT, defaultValue: 0},
    verificationCode: {type: DataTypes.STRING, allowNull: true},
    isActive: DataTypes.BOOLEAN,
    notificationEnabled:{type: DataTypes.BOOLEAN, defaultValue: true},
    companyId: {type: DataTypes.STRING, allowNull: true},
    companyName:{type: DataTypes.STRING, allowNull: true},
    industryId:{type: DataTypes.STRING, allowNull: true},
  }, {
    sequelize,
    modelName: 'User',
    tableName: "userinfo"
  });
  return User;
};
