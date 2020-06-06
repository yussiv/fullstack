const supertest = require('supertest')
const uuid = require('uuid').v1
const Blog = require('../../models/blog')
const User = require('../../models/user')
const dbHelper = require('../utils/db_helper')
const authHelper = require('../utils/auth_helper')
const app = require('../../app')
const api = supertest(app)


const authenticatedRequest = (user) => {
  const authHeader = `Bearer ${authHelper.getAuthToken(user)}`
  const request = (method, url) => {
    return api[method](url)
      .set('Authorization', authHeader)
      .set('Content-Type', 'application/json')
  }
  return {
    get: (url) => request('get', url),
    post: (url) => request('post', url),
    delete: (url) => request('delete', url),
    put: (url) => request('put', url)
  }
}

beforeAll(async () => {
  await dbHelper.setupTestDB()
})

afterAll(async () => {
  await dbHelper.teardownTestDB()
})

beforeEach(async () => {
  await dbHelper.resetDB()
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
    const user = await User.findOne({ username: 'user' })
    const newEntry = {
      title: uuid(),
      author: uuid(),
      url: uuid(),
      likes: Math.floor(Math.random() * 100),
      user: user._id.toString()
    }

    const resultBefore = await api.get('/api/blogs').expect(200)
    const foundBefore = resultBefore.body.filter(b => b.title === newEntry.title)
    expect(foundBefore.length).toBe(0)

    const response = await authenticatedRequest(user)
      .post('/api/blogs')
      .send(newEntry)
      .expect(201)
    
    const responseBody = {...response.body}
    const newId = responseBody.id
    delete responseBody.id
    
    expect(responseBody).toEqual(newEntry)

    const blog = await Blog.findById(newId)
    expect(blog.title).toEqual(newEntry.title)
    expect(blog.author).toEqual(newEntry.author)
    expect(blog.url).toEqual(newEntry.url)
  })

  test('missing "likes" attribute is set to zero in saved blog', async () => {
    const user = await User.findOne({ username: 'user' })
    const newEntry = {title: "test", author: "test", url: "test"}
    const response = await authenticatedRequest(user)
      .post('/api/blogs')
      .send(newEntry)
      .expect(201)
    
    expect(response.body.likes).toBe(0)
  })

  test('not providing "title" or "url" attribute results to 400 Bad Request', async () => {
    const user = await User.findOne({ username: 'user' })
    const noUrl = {title: "test", author: "test"}
    const noTitle = {author: "test", url: "test"}

    await authenticatedRequest(user)
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)
    
    await authenticatedRequest(user)
      .post('/api/blogs')
      .send(noTitle)
      .set('Content-Type', 'application/json')
      .expect(400)
  })

  test('Calling endpoint without authorization token returns 401 error', async () => {
    const newEntry = {
      title: 'title',
      author: 'author',
      url: 'url'
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .set('Content-Type', 'application/json')
      .expect(401)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('existing blog is removed from database', async () => {
    const user = await User.findOne({ username: 'user' })
    const id = await dbHelper.getExistingId()
    expect(id).toBeDefined()

    let entry = await Blog.findById(id)
    expect(entry).not.toBeNull()
    
    await authenticatedRequest(user)
      .delete(`/api/blogs/${id}`)
      .expect(204)
    
    entry = await Blog.findById(id)
    expect(entry).toBeNull()
  })

  test('invalid id returns 400 error', async () => {
    const user = await User.findOne({ username: 'user' })
    await authenticatedRequest(user)
      .delete('/api/blogs/lol')
      .expect(400)
  })

  test('removing nonexistent id behaves similar to removing existing id ', async () => {
    const user = await User.findOne({ username: 'user' })
    const id = await dbHelper.getNonExistentId()
    const entry = await Blog.findById(id)
    expect(entry).toBeNull()

    await authenticatedRequest(user)
      .delete(`/api/blogs/${id}`)
      .expect(204)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('like count is updated', async () => {
    const user = await User.findOne({ username: 'user' })
    const newInfo = { likes: 999 }
    const id = await dbHelper.getExistingId()

    expect(await Blog.findById(id)).not.toBe(newInfo.likes)

    const response = await authenticatedRequest(user)
      .put(`/api/blogs/${id}`)
      .send(newInfo)
      .expect(200)
    
    expect(response.body.likes).toBe(newInfo.likes)
  })

  test('invalid type returns error', async () => {
    const user = await User.findOne({ username: 'user' })
    const newInfo = { likes: 'lol' }
    const id = await dbHelper.getExistingId()

    await authenticatedRequest(user)
      .put(`/api/blogs/${id}`)
      .send(newInfo)
      .expect(400)
  })
})