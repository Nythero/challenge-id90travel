const { getAirlines } = require('../services/id90travel')
const fs = require('fs/promises')

const createAirlinesFile = async () => {
  const airlines = await getAirlines()
  const airlinesJson = JSON.stringify(airlines)
  await fs.writeFile('src/public/airlines.json', airlinesJson)
}

module.exports = createAirlinesFile
