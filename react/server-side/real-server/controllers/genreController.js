const { Genre } = require('../models')

class GenreController {
  static async createGenre(req, res, next) {
    try {
      const { name } = req.body
      const genre = await Genre.create({ name })
      res.status(201).json({
        message: 'Create new genre success!',
        data: genre
      })
    } catch (err) {
      next(err)
    }
  }

  static async showGenres(req, res, next) {
    try {
      const genres = await Genre.findAll()
      res.status(200).json({
        message: 'Show genres success!',
        data: genres
      })
    } catch (err) {
      next(err)
    }
  }

  static async showGenreById(req, res, next) {
    try {
      const { id } = req.params
      const genre = await Genre.findByPk(id)
      if (genre) {
        res.status(200).json({
          message: 'Show Genre by ID success!',
          data: genre
        })
      } else {
        throw { name: 'NotFound' }
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteGenreById(req, res, next) {
    try {
      const { id } = req.params
      await Genre.destroy({ where: { id } })
      res.status(200).json({
        message: `Success to delete id ${id}`,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async editGenreById(req, res, next) {
    try {
      const { id } = req.params
      const { name } = req.body

      const updateGenre = await Genre.update({ name }, { where: { id } })
      if (updateGenre[0] === 0) throw { name: 'NotFound' }

      const checkUpdatedGenre = await Genre.findByPk(id)
      res.status(201).json({ message: 'Update genre success', data: checkUpdatedGenre })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = GenreController