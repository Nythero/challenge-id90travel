const ValidationError = require('../utils/ValidationError')
const { login } = require('../services/id90travel')

const isString = e => typeof e === 'string' || e instanceof String

const validateBodyData = body => {
  const properties = ['airline', 'username', 'password']
  for(const property of properties) {
    if(!isString(body[property]) || body[property] === '')
      throw new ValidationError(`${property} is invalid`, property)
  }
}

const generateRequest = body => ({
  airline: body.airline,
  username: body.username,
  password: body.password,
  remember_me: body.remember_me
})

const generateResponse = loginResponse => ({
  redirect: '/hotels'
})

const setResponseHeaders = (res, loginResponse) => {
  const headers = loginResponse.headers
  res.append('set-cookie', headers['set-cookie'])
}

const loginController = async (req, res, next) => {
  try {
    validateBodyData(req.body)
    const request = generateRequest(req.body)
    const loginResponse = await login(request)
    const response = generateResponse(loginResponse.data)
    setResponseHeaders(res, loginResponse)
    res.status(200).json(response)
  }
  catch(err) {
    next(err)
  }
}

module.exports = loginController
