const loginBodyValidator = require('../middlewares/loginBodyValidator')
const loginController = require('../controllers/login')
const express = require('express')
const loginRouter = express.Router()

loginRouter.post('/', [
  loginBodyValidator,
  loginController
])

module.exports = loginRouter
