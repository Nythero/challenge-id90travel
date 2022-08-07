const { login } = require('../services/id90travel')
const { validateLoginBodyData } = require('../utils/validators')


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
    validateLoginBodyData(req.body)
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
