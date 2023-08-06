const { Cast } = require('../models')

class CastController {
  static async createCast(req, res, next) {
    try {
      const { movieId, name, profilePict } = req.body
      const cast = await Cast.create({ movieId, name, profilePict })
      res.status(201).json({
        message: 'Create new cast success!',
        data: cast
      })
    } catch (err) {
      next(err)
    }
  }

  static async showCasts(req, res, next) {
    try {
      const casts = await Cast.findAll()
      res.status(200).json({
        message: 'Show casts success!',
        data: casts
      })
    } catch (err) {
      next(err)
    }
  }

  static async showCastById(req, res, next) {
    try {
      const { id } = req.params
      const cast = await Cast.findByPk(id)
      if (cast) {
        res.status(200).json({
          message: 'Show cast by ID success!',
          data: cast
        })
      } else {
        throw { name: 'NotFound' }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CastController