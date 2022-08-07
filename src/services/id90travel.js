const BASEURL = 'https://beta.id90travel.com'
const axios = require('axios')

const getAirlines = async () => {
  const PATH = '/airlines'
  const response = await axios.get(BASEURL + PATH)
  return response.data
}

const login = async request => {
  const PATH = '/session.json'
  const response = await axios.post(BASEURL + PATH, request)
  return response
}

const getHotels = async request => {
  const API_PATH = '/api/v1/hotels.json'
  const url = BASEURL + API_PATH + request
  const response = await axios.get(url)
  return response.data
}

module.exports = {
  getAirlines,
  login,
  getHotels
}
