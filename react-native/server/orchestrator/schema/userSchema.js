const axios = require('axios')
const redis = require('../config/redis')

const typeDefs = `#graphql
  # Model
  type MongoUser {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Response {
    msg: String
  }

  # Endpoint
  type Query {
    findMongoUsers: [MongoUser]
    findMongoUserById(id: ID!): MongoUser
  }

  type Mutation {
    createMongoUser(username: String, email: String, password: String, role: String, phoneNumber: String, address: String): MongoUser
    deleteMongoUser(id: ID!): Response
  }
`;

const baseUrlUsers = 'http://user-service:4001'
const resolvers = {
  Query: {
    findMongoUsers: async () => {
      try {
        let response
        const usersCache = await redis.get('app:users')
        if (!usersCache) {
          const { data } = await axios({
            method: 'get',
            url: `${baseUrlUsers}/users`
          })
          await redis.set('app:users', JSON.stringify(data))
          response = data
        } else {
          response = JSON.parse(usersCache)
        }
        return response
      } catch (err) {
        throw err
      }
    },
    findMongoUserById: async (_, args) => {
      const { id } = args
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrlUsers}/users/${id}`
        })
        return data
      } catch (err) {
        throw err
      }
    },
  },
  Mutation: {
    createMongoUser: async (_, args) => {
      const { username, email, password, role, phoneNumber, address } = args
      try {
        const { data } = await axios({
          method: 'post',
          url: `${baseUrlUsers}/register`,
          data: { username, email, password, role, phoneNumber, address }
        })
        await redis.del('app:users')
        return data
      } catch (err) {
        throw err
      }
    },
    deleteMongoUser: async (_, args) => {
      const { id } = args
      try {
        await axios({
          method: 'delete',
          url: `${baseUrlUsers}/users/${id}`
        })
        await redis.del('app:users')
      } catch (err) {
        throw err
      }
    }
  }
};

module.exports = [typeDefs, resolvers]