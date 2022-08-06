const ValidationError = require('../utils/ValidationError')

const isString = e => typeof e === 'string' || e instanceof String

const validateBodyData = body => {
  const properties = ['airline', 'username', 'password']
  for(const property of properties) {
    if(!isString(body[property]))
      throw new ValidationError(`${property} is invalid`, property)
  }
}

const loginController = (req, res, next) => {
  validateBodyData(req.body)
  res.status(204).end()
}

module.exports = loginController
