const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const loginController = require('./controllers/login')

app.use(express.json())
app.use('/login', loginController)
app.use(errorHandler)

module.exports = app
