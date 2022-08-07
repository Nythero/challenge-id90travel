const ValidationError = require('../utils/ValidationError')

const isString = e => typeof e === 'string' || e instanceof String

const isObject = e => e && typeof e === 'object'

const isEmptyString = s => s === ''

const validateIsObject = e => {
  if(!isObject)
    throw new ValidationError(`${e} is not an object`, e)
}

const validateHasStringProperties = (object, properties) => {
  for(const property of properties) {
    if(!isString(object[property]) || isEmptyString(object[property]))
      throw new ValidationError(`${property} is invalid`, property)
  }
}

const validateLoginBodyData = req => {
  validateIsObject(req.body)
  const properties = ['airline', 'username', 'password']
  validateHasStringProperties(req.body, properties)
}

module.exports = {
  validateLoginBodyData
}
