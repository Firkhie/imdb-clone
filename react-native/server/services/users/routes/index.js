const Controller = require('../controllers')

const router = require('express').Router()

router.post('/register', Controller.registerUser)
router.get('/users', Controller.showAllUsers)
router.get('/users/:id', Controller.showUser)
router.put('/users/:id', Controller.updateUser)
router.delete('/users/:id', Controller.deleteUser)

module.exports = router