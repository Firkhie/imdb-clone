const CastController = require('../controllers/castController')
const GenreController = require('../controllers/genreController')
const MovieController = require('../controllers/movieController')
const UserController = require('../controllers/userController')
const { userAuth, movieAuth, genreAuth } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/login', UserController.login)

router.get('/pub/movies', MovieController.showMovies)
router.get('/pub/movies/:id', MovieController.showMovieById)
router.post('/pub/movies', MovieController.createMovie)
router.put('/pub/movies/:id', MovieController.editMovieById)
router.delete('/pub/movies/:id', MovieController.deleteMovieById)

router.use(userAuth)

router.post('/register', UserController.register)
router.post('/movies', MovieController.createMovie)
router.get('/movies', MovieController.showMovies)
router.get('/movies/:id', MovieController.showMovieById)
router.delete('/movies/:id', movieAuth, MovieController.deleteMovieById)
router.put('/movies/:id', movieAuth, MovieController.editMovieById)

router.post('/genres', GenreController.createGenre)
router.get('/genres', GenreController.showGenres)
router.get('/genres/:id', GenreController.showGenreById)
router.delete('/genres/:id', genreAuth, GenreController.deleteGenreById)
router.put('/genres/:id', genreAuth, GenreController.editGenreById)

router.post('/casts', CastController.createCast)
router.get('/casts', CastController.showCasts)
router.get('/casts/:id', CastController.showCastById)

module.exports = router