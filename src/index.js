const app = require('./app')
const { PORT } = require('./utils/config')
const createAirlinesFile = require('./utils/createAirlinesFile')

const run = async () => {
  await createAirlinesFile()
  app.listen(PORT, () => console.log(`Listening at port: ${PORT}`))
}

run()
