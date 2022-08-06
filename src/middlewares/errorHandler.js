const errorHandler = (err, req, res, next) => {
  if(err.name === 'ValidationError')
    res.status(400).json({ error: `${err.element} is missing or is invalid` })
  else {
    console.error(err)
    res.status(500).end()
  }
}

module.exports = errorHandler
