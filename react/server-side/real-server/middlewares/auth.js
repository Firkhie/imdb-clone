const { decodeToken } = require('../helpers/jwt')
const { User, Movie, Genre } = require('../models')

async function userAuth(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) throw { name: 'Unauthenticated' }
    let payload = decodeToken(access_token)
    let user = await User.findByPk(payload.id)
    if (!user) throw { name: 'Unauthenticated' }
    req.user = {
      authorId: user.id,
      role: user.role
    }
    next()
  } catch (err) {
    next(err)
  }
}

async function movieAuth(req, res, next) {
  try {
    let movie = await Movie.findByPk(req.params.id)
    if (!movie) throw { name: 'NotFound' }
    next()
  } catch (err) {
    next(err)
  }
}

async function genreAuth(req, res, next) {
  try {
    let genre = await Genre.findByPk(req.params.id)
    if (!genre) throw { name: 'NotFound' }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { userAuth, movieAuth, genreAuth }