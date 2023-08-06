const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body
      let role = 'Admin'
      let createUser = await User.create({ username, email, password, role, phoneNumber, address })
      res.status(201).json({
        message: 'Create user success!',
        data: { id: createUser.id, email }
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body
    try {
      if (!email || !password) throw { name: 'EmailPasswordIsRequired' }
      let searchUser = await User.findOne({ where: { email } })
      if (searchUser) {
        let checkPassword = compare(password, searchUser.password)
        if (checkPassword) {
          res.status(200).json({ access_token: signToken({ id: searchUser.id }), id: searchUser.id, email, role: searchUser.role, username: searchUser.username })
        } else {
          throw { name: 'EmailPasswordIsInvalid' }
        }
      } else {
        throw { name: 'EmailPasswordIsInvalid' }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController