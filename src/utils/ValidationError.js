class ValidationError extends Error {
  constructor(msg, element) {
    super()
    this.element = element
    this.message = msg
    this.name = 'ValidationError'
  }
}

module.exports = ValidationError
