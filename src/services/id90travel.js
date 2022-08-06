const BASEURL = 'https://beta.id90travel.com'
const axios = require('axios')

const getAirlines = async () => {
  const response = await axios.get(BASEURL + '/airlines')
  return response.data
}

module.exports = {
  getAirlines
}
