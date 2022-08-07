const { validateLoginBodyData } = require('../utils/validators')

const loginBodyValidator = (req, _res, next) => {
  try {
    validateLoginBodyData(req)
    next()
  }
  catch(err) {
    next(err)
  }
}

module.exports = loginBodyValidator
