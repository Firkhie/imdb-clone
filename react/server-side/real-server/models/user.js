'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, { foreignKey: 'authorId' })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists!'
      },
      validate: {
        notEmpty: {
          msg: 'Username is required!'
        }
      } 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists!'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Input must be in email format!'
        },
        notNull: {
          msg: 'Email cannot be null!'
        }
      } 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required!'
        },
        notNull: {
          msg: 'Password cannot be null!'
        },
        len: {
          args: 5,
          msg: 'Minimum password length is 5!'
        }
      } 
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Role is required!'
        }
      } 
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (instance, options) => {
        instance.password = await hash(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};