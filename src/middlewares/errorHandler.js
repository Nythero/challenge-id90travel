const errorHandler = (err, _req, res, next) => {
  if(err.name === 'ValidationError')
    res.status(400).json({ error: `${err.element} is missing or is invalid` })
  else {
    console.error(err)
    res.status(500).json({ error: 'server side error' })
  }
}

module.exports = errorHandler
