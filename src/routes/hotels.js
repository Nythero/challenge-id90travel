const express = require('express')
const hotelsController = require('../controllers/hotels')
const hotelsRouter = express.Router()

hotelsRouter.get('/', hotelsController)

module.exports = hotelsRouter
