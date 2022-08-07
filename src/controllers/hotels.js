const { getHotels } = require('../services/id90travel')

const generateRequest = req => {
  const url = req.originalUrl
  const regexp = /\/hotels(.*$)/
  const result = regexp.exec(url)
  return result[1]
}

const generateResponse = hotelsResponse => hotelsResponse

const hotelsController = async (req, res, next) => {
  try {
    const request = generateRequest(req)
    const hotelsResponse = await getHotels(request)
    const response = generateResponse(hotelsResponse)
    res.status(200).json(response)
  }
  catch(err) {
    next(err)
  }
}

module.exports = hotelsController
