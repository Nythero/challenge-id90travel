const loginController = require('controllers/login')
//Mocks login service
let { login } = require('services/id90travel.js')
jest.mock('services/id90travel.js', () => ({
  login: jest.fn()
}))

let reqMock
let resMock
let nextMock

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
  let body = {
    username: '',
    password: '',
    airline: '',
    remember_me: ''
  }
  reqMock = { body }
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
  
  expect(login).toHaveBeenCalledWith(expect.anything())
  expect(resMock.status).toHaveBeenCalledWith(200)
  expect(resMock.json).toHaveBeenCalled()
})

describe('should call next', () => {
  test('when login fails', async () => {
    login.mockImplementation(() => {
      throw new Error()
    })

    await loginController(reqMock, resMock, nextMock)
  
    expect(login).toThrow()
    expect(nextMock).toHaveBeenCalledWith(expect.any(Error))
  })
})
