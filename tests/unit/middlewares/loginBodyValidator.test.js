const loginBodyValidator = require('middlewares/loginBodyValidator.js')
const { validateLoginBodyData } = require('utils/validators.js')
jest.mock('utils/validators.js', () => ({
  validateLoginBodyData: jest.fn()
}))

let reqMock
let resMock
let nextMock

beforeAll(() => {
  reqMock = jest.fn()
  resMock = jest.fn()
  nextMock = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should call next with no arguments if validation succeeds', () => {
  loginBodyValidator(reqMock, resMock, nextMock)

  expect(validateLoginBodyData).toHaveBeenCalledWith(reqMock)
  expect(nextMock).toHaveBeenCalled()
  expect(nextMock).not.toHaveBeenCalledWith(expect.anything())
})

test('should call next with an Error if validation fails', () => {
  validateLoginBodyData.mockImplementation(() => {
    throw new Error()
  })

  loginBodyValidator(reqMock, resMock, nextMock)

  expect(validateLoginBodyData).toThrow()
  expect(nextMock).toHaveBeenCalledWith(expect.any(Error))
})
