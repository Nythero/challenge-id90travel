const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const loginRoute = require('./routes/login')
const hotelsRoute = require('./routes/hotels')

const staticOptions = {
  extensions: ['html']
}
app.use(express.static(__dirname+'/public', staticOptions))
app.use(express.json())
app.use('/api/login', loginRoute)
app.use('/api/hotels', hotelsRoute)
app.use(errorHandler)

module.exports = app
