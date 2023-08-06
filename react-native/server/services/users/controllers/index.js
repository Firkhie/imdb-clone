const MongoDBConnection = require("../config/connection")
const { hash } = require("../helpers/bcrypt")
const { ObjectId } = require('mongodb');

class Controller {
  static async showAllUsers(req, res) {
    try {
      const { db } = MongoDBConnection
      const data = await db.collection('users').find().project({ username: 1, email: 1 }).toArray()
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async showUser(req, res) {
    try {
      const { db } = MongoDBConnection
      const data = await db.collection('users').findOne(
        { _id: new ObjectId(req.params.id) },
        { projection: { password: 0 } }
      );
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async registerUser(req, res) {
    try {
      const { db } = MongoDBConnection

      let { username, email, password, phoneNumber, address } = req.body
      if (!username || !email || !password || !phoneNumber || !address) {
        throw {
          status: 400,
          message: 'Bad request'
        }
      }

      let dataFindUsername = await db.collection('users').findOne({ email })
      let dataFindEmail = await db.collection('users').findOne({ username })
      if (dataFindUsername || dataFindEmail) {
        throw {
          status: 409,
          message: 'Username or email already exist'
        }
      }

      password = hash(password)
      let obj = { username, email, password, role: 'Admin', phoneNumber, address }
      let data = await db.collection('users').insertOne(obj)
      res.status(201).json({
        message: `Success register _id ${data.insertedId}`
      })
    } catch (err) {
      console.log(err)
      res.status(err.status).json({
        message: err.message
      })
    }
  }

  static async updateUser(req, res) {
    try {
      let { username, email, password, phoneNumber, address } = req.body
      const { db } = MongoDBConnection
      const data = await db.collection('users').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { username, email, password, phoneNumber, address } }
      )
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteUser(req, res) {
    try {
      const { db } = MongoDBConnection
      const data = await db.collection('users').deleteOne(({ _id: new ObjectId(req.params.id) }))
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Controller