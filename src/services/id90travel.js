const BASEURL = 'https://beta.id90travel.com'
const axios = require('axios')

const getAirlines = async () => {
  const response = await axios.get(BASEURL + '/airlines')
  return response.data
}

const login = async (request) => {
  const response = await axios.post(BASEURL + '/session.json', request)
  return response
}

module.exports = {
  getAirlines,
  login
}
