const app = require('app')
const supertest = require('supertest')

const api = supertest(app)

test('login succeeds', async () => {
  const request = '/api/hotels?guests[]=2&checkin=2022-11-24&checkout=2022-11-25&destination=Cancun'
  const response = await api.get(request)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const body = response.body
  expect(body).not.toHaveProperty('error')
  expect(body).toHaveProperty('hotels')
  //TODO check json-schema is correct
}, 10000)
