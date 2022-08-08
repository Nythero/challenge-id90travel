const { getHotels } = require('../services/id90travel')

//Returns the substring that comes after /hotels
const generateRequest = req => {
  const url = req.originalUrl
  const regexp = /\/hotels(.*$)/
  const result = regexp.exec(url)
  return result[1]
}

const hotelsController = async (req, res, next) => {
  try {
    const request = generateRequest(req)
    const hotelsResponse = await getHotels(request)
    res.status(200).json(hotelsResponse)
  }
  catch(err) {
    next(err)
  }
}

module.exports = hotelsController
