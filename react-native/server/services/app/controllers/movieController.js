const slug = require('../helpers/slug');
const { User, Movie, Genre, Cast } = require('../models')

class MovieController {
  static async createMovie(req, res, next) {
    try {
      const movieData = req.body;
      if (req.path === '/pub/movies') {
        movieData.authorId = 1
      } else {
        movieData.authorId = req.user.authorId
      }
      const movie = await Movie.createMovieTransaction(movieData);
      res.status(201).json({
        message: 'Create new Movie success!',
        data: movie
      })
    } catch (err) {
      next(err)
    }
  }

  static async showMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Genre,
            attributes: ['name']
          },
          {
            model: Cast,
            attributes: ['name', 'profilePict']
          },

        ]
      })
      res.status(200).json({
        message: 'Show Movies success!',
        data: movies
      })
    } catch (err) {
      next(err)
    }
  }

  static async showMovieById(req, res, next) {
    try {
      const { id } = req.params
      const movie = await Movie.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Genre,
            attributes: ['name']
          },
          {
            model: Cast,
            attributes: ['name', 'profilePict']
          },

        ]
      })
      if (movie) {
        res.status(200).json({
          message: 'Show Movie by ID success!',
          data: movie
        })
      } else {
        throw { name: 'NotFound' }
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteMovieById(req, res, next) {
    try {
      const { id } = req.params
      await Movie.destroy({ where: { id } })
      res.status(200).json({
        message: `Success to delete id ${id}`,
      })
    } catch (err) {
      next(err)
    }
  }

  static async editMovieById(req, res, next) {
    try {
      const { id } = req.params
      const movieData = req.body
      console.log(id)
      const newSlug = slug(movieData.title)
      movieData.slug = newSlug
      console.log(movieData)

      const updateMovie = await Movie.update(movieData, { where: { id } })
      if (updateMovie[0] === 0) throw { name: 'NotFound' }

      const checkUpdatedMovie = await Movie.findByPk(id)
      res.status(201).json({ message: 'Update Movie success', data: checkUpdatedMovie })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MovieController