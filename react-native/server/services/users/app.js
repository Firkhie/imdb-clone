require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const MongoDBConnection = require('./config/connection')
const app = express()
const port = process.env.PORT || 4001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

MongoDBConnection.connectToCluster()

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})