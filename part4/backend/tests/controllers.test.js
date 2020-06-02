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
  })
  
  test('Database has one additional blog', async () => {
    const [title, author] = [uuid(), uuid()]
    const blog = new Blog({title, author, likes: 6})
    await blog.save()
    
    const result = await api.get('/api/blogs')
    expect(result.body.length).toBe(6)
  
    const bodyText = JSON.stringify(result.body)
    expect(bodyText).toContain(title)
    expect(bodyText).toContain(author)
  })

  test('Blog item has id defined', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
  })
})
