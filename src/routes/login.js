const loginBodyValidator = require('../middlewares/loginBodyValidator')
const loginController = require('../controllers/login')
const express = require('express')
const loginRouter = express.Router()

loginRouter.use('/', [
  loginBodyValidator,
  loginController
])

module.exports = loginRouter
