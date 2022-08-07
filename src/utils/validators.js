const ValidationError = require('../utils/ValidationError')

const isString = e => typeof e === 'string' || e instanceof String

const validateLoginBodyData = body => {
  const properties = ['airline', 'username', 'password']
  for(const property of properties) {
    if(!isString(body[property]) || body[property] === '')
      throw new ValidationError(`${property} is invalid`, property)
  }
}

module.exports = {
  validateLoginBodyData
}
