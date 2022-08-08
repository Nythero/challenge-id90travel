const { login } = require('../services/id90travel')

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
  const setCookie = headers['set-cookie']
  res.append('set-cookie', setCookie)
}

const loginController = async (req, res, next) => {
  try {
    const request = generateRequest(req.body)
    const loginResponse = await login(request)
    const response = generateResponse(loginResponse)
    setResponseHeaders(res, loginResponse)
    res.status(200).json(response)
  }
  catch(err) {
    next(err)
  }
}

module.exports = loginController
