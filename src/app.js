const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const loginController = require('./controllers/login')

const staticOptions = { extensions: ['html'] }
app.use(express.static(__dirname+'/public', staticOptions))
app.use(express.json())
app.use('/api/login', loginController)
app.use(errorHandler)

module.exports = app
