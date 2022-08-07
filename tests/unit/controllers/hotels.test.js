const loginController = require('controllers/hotels')

let { getHotels } = require('services/id90travel.js')
jest.mock('services/id90travel.js', () => ({
  getHotels: jest.fn()
}))

let reqMock
let resMock
let nextMock

const mockRes = () => {
  resMock = {
    status: jest.fn(),
    json: jest.fn()
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

test('should call hotels service and respond with status code 200', async () => {
  reqMock = {
    originalUrl: '/hotels'
  }
  getHotels.mockImplementation(() => ({}))

  await loginController(reqMock, resMock, nextMock)
  
  expect(getHotels).toHaveBeenCalledWith(expect.anything())
  expect(resMock.status).toHaveBeenCalledWith(200)
  expect(resMock.json).toHaveBeenCalled()
})

describe('should call next', () => {
  test('when original Url doesn\'t contain /hotels', async () => {
    reqMock = {
      originalUrl: ''
    }
    await loginController(reqMock, resMock, nextMock)
    
    expect(nextMock).toHaveBeenCalledWith(expect.any(Error))
  })

  test('when getHotels fails', async () => {
    reqMock = { originalUrl: '/hotels' }
    getHotels.mockImplementation(() => {
      throw new Error()
    })
  
    await loginController(reqMock, resMock, nextMock)
    
    expect(getHotels).toThrow()
    expect(nextMock).toHaveBeenCalledWith(expect.any(Error))
  })
})
