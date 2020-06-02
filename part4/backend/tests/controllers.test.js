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
    const newEntry = {
      title: uuid(),
      author: uuid(),
      url: uuid(),
      likes: Math.floor(Math.random() * 100)
    }

    const resultBefore = await api.get('/api/blogs').expect(200)
    const foundBefore = resultBefore.body.filter(b => b.title === newEntry.title)
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

  test('missing "likes" attribute is set to zero in saved blog', async () => {
    const newEntry = {title: "test", author: "test", url: "test"}
    const response = await api
      .post('/api/blogs')
      .send(newEntry)
      .set('Content-Type', 'application/json')
      .expect(201)
    
    expect(response.body.likes).toBe(0)
  })

  test('not providing "title" or "url" attribute results to 400 Bad Request', async () => {
    const noUrl = {title: "test", author: "test"}
    const noTitle = {author: "test", url: "test"}

    await api
      .post('/api/blogs')
      .send(noUrl)
      .set('Content-Type', 'application/json')
      .expect(400)
    
    await api
      .post('/api/blogs')
      .send(noTitle)
      .set('Content-Type', 'application/json')
      .expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('existing blog is removed from database', async () => {
    const id = await helper.getExistingId()
    expect(id).toBeDefined()

    let entry = await Blog.findById(id)
    expect(entry).not.toBeNull()
    
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
    
    entry = await Blog.findById(id)
    expect(entry).toBeNull()
  })

  test('invalid id returns 400 error', async () => {
    await api
      .delete('/api/blogs/lol')
      .expect(400)
  })

  test('removing nonexistent id behaves similar to removing existing id ', async () => {
    const id = await helper.getNonExistentId()
    const entry = await Blog.findById(id)
    expect(entry).toBeNull()

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('like count is updated', async () => {
    const newInfo = { likes: 999 }
    const id = await helper.getExistingId()

    expect(await Blog.findById(id)).not.toBe(newInfo.likes)

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(newInfo)
      .expect(200)
    
    expect(response.body.likes).toBe(newInfo.likes)
  })

  test('invalid type returns error', async () => {
    const newInfo = { likes: 'lol' }
    const id = await helper.getExistingId()

    await api
      .put(`/api/blogs/${id}`)
      .send(newInfo)
      .expect(400)
  })
})