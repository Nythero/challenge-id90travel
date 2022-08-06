const loginController = require('../../src/controllers/login')

let reqMock
let resMock
let nextMock
let { login } = require('../../src/services/id90travel.js')
jest.mock('../../src/services/id90travel.js', () => ({
  login: jest.fn()
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

const request = {
  airline: 'HA',
  username: 'halucas',
  password: '123456',
  remember_me: '1'
}

beforeAll(() => {
  mockRes()
  nextMock = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should call login service and respond with status code 200', async () => {
  const body = { ...request }
  reqMock = { body }
  const data = {
    redirect: ''
  }
  login.mockImplementation(() => ({
    headers: {},
    data
  }))

  await loginController(reqMock, resMock, nextMock)
  
  expect(login).toHaveBeenCalledWith(body)
  expect(resMock.status).toHaveBeenCalledWith(200)
  expect(resMock.json).toHaveBeenCalled()
})

describe('should call next', () => {
  test('when there\'s no airline', async () => {
    const { airline, ...body } = request
    reqMock = { body }
    const data = {
      redirect: ''
    }

    await loginController(reqMock, resMock, nextMock)
    
    expect(login).not.toHaveBeenCalled()
    expect(nextMock).toHaveBeenCalledWith(expect.anything())
  })
  test('when there\'s no username', async () => {
    const { username, ...body } = request
    reqMock = { body }
    const data = {
      redirect: ''
    }

    await loginController(reqMock, resMock, nextMock)
    
    expect(login).not.toHaveBeenCalled()
    expect(nextMock).toHaveBeenCalledWith(expect.anything())
  })
  test('when there\'s no password', async () => {
    const { password, ...body } = request
    reqMock = { body }
    const data = {
      redirect: ''
    }

    await loginController(reqMock, resMock, nextMock)
    
    expect(login).not.toHaveBeenCalled()
    expect(nextMock).toHaveBeenCalledWith(expect.anything())
  })
  test('when login fails', async () => {
    const body = { ...request }
    reqMock = { body }
    const data = {
      redirect: ''
    }
    login.mockImplementation(() => {
      throw new Error()
    })

    await loginController(reqMock, resMock, nextMock)
    
    expect(login).toHaveBeenCalledWith(body)
    expect(nextMock).toHaveBeenCalledWith(expect.anything())
  })
})
