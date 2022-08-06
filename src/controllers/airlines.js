const express = require('express')
const airlinesRouter = express.Router()
const { getAirlines } = require('../services/id90travel')

airlinesRouter.get('/', async (req, res, next) => {
  try {
    const airlines = await getAirlines()
    res.status(200).json(airlines)
  }
  catch(err) {
    next(err)
  }
})

module.exports = airlinesRouter
