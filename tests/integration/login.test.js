const app = require('../../src/app')
const supertest = require('supertest')

const api = supertest(app)

const request = {
  airline: 'HA',
  username: 'halucas',
  password: '123456',
  remember_me: '1'
}

test('login succeeds with valid credentials', async () => {
  await api.get('/login')
    .send(request)
    .expect(204)
})

test('login fails without an airline', async () => {
  const { airline, ...newRequest } = request
  const response = await api.get('/login')
    .send(newRequest)
    .expect(400)
  const body = response.body
  expect(body).toHaveProperty('error')
  expect(body.error.includes('airline')).toBeTruthy()
})

test('login fails without an username', async () => {
  const { username, ...newRequest } = request
  const response = await api.get('/login')
    .send(newRequest)
    .expect(400)
  const body = response.body
  expect(body).toHaveProperty('error')
  expect(body.error.includes('username')).toBeTruthy()
})

test('login fails without an password', async () => {
  const { password, ...newRequest } = request
  const response = await api.get('/login')
    .send(newRequest)
    .expect(400)
  const body = response.body
  expect(body).toHaveProperty('error')
  expect(body.error.includes('password')).toBeTruthy()
})
