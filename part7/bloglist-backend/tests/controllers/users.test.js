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
  await helper.resetDB()
})

describe('POST /api/users', () => {
  test('new user can be added', async () => {
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

  test('username is required', async () => {
    const result = await api
      .post('/api/users')
      .send({
        name: "test",
        password: "sekrid"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is required')
  })

  test('username must be at least 3 characters', async () => {
    const result = await api
      .post('/api/users')
      .send({
        username: "te",
        password: "sekrid"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('minimum allowed length')
  })

  test('username must be unique', async () => {
    await api
      .post('/api/users')
      .send({
        username: "teppo",
        password: "sekrid"
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const result = await api
      .post('/api/users')
      .send({
        username: "teppo",
        password: "sekrid2"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('to be unique')
  })

  test('password is required', async () => {
    const result = await api
      .post('/api/users')
      .send({
        username: "test",
        name: "test"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is required')
  })

  test('password must be at least 3 characters', async () => {
    const result = await api
      .post('/api/users')
      .send({
        username: "teppo",
        password: "se"
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('at least 3 characters')
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