const supertest = require('supertest')
const uuid = require('uuid').v1
const helper = require('../utils/db_helper')
const app = require('../../app')
const api = supertest(app)
const User = require('../../models/user')

beforeAll(async () => {
  await helper.setupTestDB()
})

afterAll(async () => {
  await helper.teardownTestDB()
})

beforeEach(async () => {
  await helper.resetUsers()
})

describe('POST /api/users', () => {
  test('new user is added', async () => {
    const newUser = {
      name: "test",
      username: uuid(),
      password: "secret"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const users = await User.find({})
    const foundUsers = users.filter(u => u.username === newUser.username)
    expect(foundUsers).toHaveLength(1)
  })
})

describe('GET /api/users', () => {
  test('password hash is not present', async () => {
    const result = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.length).toBeGreaterThan(0)
    const user = result.body[0]
    expect(user.passwordHash).toBeUndefined()
    expect(user.name).toBeDefined()
    expect(user.username).toBeDefined()
  })
})