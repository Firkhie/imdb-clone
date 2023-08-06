require('dotenv').config()

const express = require('express')
const Controller = require('./controllers')
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/movies', Controller.showMovies)
app.get('/movies/:id', Controller.showMovie)
app.post('/movies', Controller.createMovie)
app.get('/users', Controller.showUsers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})