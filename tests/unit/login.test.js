const loginController = require('../../src/controllers/login')

let body = {
  username: '',
  password: '',
  airline: '',
  remember_me: ''
}
let reqMock = { body }
let resMock
let nextMock
//Mocks login service
let { login } = require('../../src/services/id90travel.js')
jest.mock('../../src/services/id90travel.js', () => ({
  login: jest.fn()
}))
//Mocks body validator
let { validateLoginBodyData } = require('../../src/utils/validators.js')
jest.mock('../../src/utils/validators.js', () => ({
  validateLoginBodyData: jest.fn()
}))

const mockRes = () => {
  resMock = {
    status: jest.fn(),
    json: jest.fn(),
    append: jest.fn()
  }
  resMock.status.mockReturnThis()
  resMock.json.mockReturnThis()
}

beforeAll(() => {
  mockRes()
  nextMock = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should call login service and respond with status code 200', async () => {
  const data = { redirect: '' }
  login.mockImplementation(() => ({
    headers: {},
    data
  }))

  await loginController(reqMock, resMock, nextMock)
  
  expect(validateLoginBodyData).toHaveBeenCalled()
  expect(login).toHaveBeenCalledWith(body)
  expect(resMock.status).toHaveBeenCalledWith(200)
  expect(resMock.json).toHaveBeenCalled()
})

describe('should call next', () => {
  test('when validations fails', async () => {
    validateLoginBodyData.mockImplementation(() => {
      throw new Error()
    })
    await loginController(reqMock, resMock, nextMock)
  
    expect(validateLoginBodyData).toThrow()  
    expect(login).not.toHaveBeenCalled()
    expect(nextMock).toHaveBeenCalledWith(expect.any(Error))
  })
  test('when login fails', async () => {
    login.mockImplementation(() => {
      throw new Error()
    })

    await loginController(reqMock, resMock, nextMock)
  
    expect(validateLoginBodyData).toHaveBeenCalled()    
    expect(login).toThrow()
    expect(nextMock).toHaveBeenCalledWith(expect.any(Error))
  })
})
