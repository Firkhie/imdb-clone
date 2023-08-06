const axios = require('axios')
const baseUrlApp = 'http://localhost:4002'
const baseUrlUsers = 'http://localhost:4001'
const redis = require('../config/redis')

class Controller {
  static async showMovies(req, res) {
    try {
      let response
      const moviesCache = await redis.get('app:movies')
      if (!moviesCache) {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrlApp}/pub/movies`
        })
        await redis.set('app:movies', JSON.stringify(data))
        response = data
      } else {
        response = JSON.parse(moviesCache)
      }
      res.status(200).json(response)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async showMovie(req, res) {
    try {
      const { id } = req.params
      const { data } = await axios({
        method: 'get',
        url: `${baseUrlApp}/pub/movies/${id}`
      })
      const mongoData = await axios({
        method: 'get',
        url: `${baseUrlUsers}/users/${data.data.mongoId}`
      })
      data.data.mongoUser = mongoData.data
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async createMovie(req, res) {
    try {
      const movieData = req.body
      const { data } = await axios({
        method: 'post',
        url: `${baseUrlApp}/pub/movies`,
        data: movieData
      })
      await redis.del('app:movies')
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async showUsers(req, res) {
    try {
      let response
      const usersCache = await redis.get('users:users')
      if (!usersCache) {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrlUsers}/users`
        })
        await redis.set('users:users', JSON.stringify(data))
        response = data
      } else {
        response = JSON.parse(usersCache)
      }
      res.status(200).json(response)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = Controller