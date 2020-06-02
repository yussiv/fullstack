const supertest = require('supertest')
const uuid = require('uuid').v1
const Blog = require('../models/blog')
const helper = require('./utils/db_helper')
const app = require('../app')
const api = supertest(app)

beforeAll(async () => {
  await helper.setupTestDB()
})

afterAll(async () => {
  await helper.teardownTestDB()
})

beforeEach(async () => {
  await helper.resetBlogs()
})

describe('GET /api/blogs', () => {
  test('Database initially has the 5 default blogs', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(result.body.length).toBe(5)

    const filtered = result.body.filter(b => b.author === 'Martin Fowler')
    expect(filtered.length).toBe(2)
  })

  test('Blog item has id defined', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('Blog item can be added', async () => {
    const [title, author, likes] = [uuid(), uuid(), Math.floor(Math.random() * 100)]
    const newEntry = {title, author, likes}

    const resultBefore = await api.get('/api/blogs').expect(200)
    const foundBefore = resultBefore.body.filter(b => b.title === title)
    expect(foundBefore.length).toBe(0)

    const response = await api
      .post('/api/blogs')
      .send(newEntry)
      .set('Content-Type', 'application/json')
      .expect(201)
    
    const responseBody = {...response.body}
    delete responseBody.id
    expect(responseBody).toEqual(newEntry)

    const resultAfter = await api.get('/api/blogs').expect(200)
    expect(resultAfter.body).toContainEqual(response.body)
  })
})