const listHelper = require('../utils/list_helper')

const manyBlogs = require('./utils/initial_blogs.json')
const emptyBlogs = []
const oneBlog = manyBlogs.slice(0, 1)

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

  test('of one blog is correct', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(8)
  })

  test('of many blogs is correct', () => {
    const result = listHelper.totalLikes(manyBlogs)
    expect(result).toBe(60)
  })
})

describe('favourite blog', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.favoriteBlog(emptyBlogs)
    expect(result).toEqual({})
  })

  test('of one blog is the only blog', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual({
      "title": "The C Programming Language",
      "author": "Brian Kernighan, Dennis Ritchie",
      "url": "https://archive.org/details/TheCProgrammingLanguageFirstEdition",
      "likes": 8
    })
  })

  test('of many blogs is correct', () => {
    const result = listHelper.favoriteBlog(manyBlogs)
    expect(result).toEqual({
      "title": "Patterns for Managing Source Code Branches",
      "author": "Martin Fowler",
      "url": "https://martinfowler.com/articles/branching-patterns.html",
      "likes": 42
    })
  })
})

describe('most blogs', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostBlogs(emptyBlogs)
    expect(result).toEqual({})
  })

  test('of one blog is the only author with a count of one', () => {
    const result = listHelper.mostBlogs(oneBlog)
    expect(result).toEqual({
      "author": "Brian Kernighan, Dennis Ritchie",
      "blogs": 1
    })
  })

  test('of many blogs is correct', () => {
    const result = listHelper.mostBlogs(manyBlogs)
    expect(result).toEqual({
      "author": "Martin Fowler",
      "blogs": 2
    })
  })
})

describe('most likes', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostLikes(emptyBlogs)
    expect(result).toEqual({})
  })

  test('of one blog is the likes of the only blog', () => {
    const result = listHelper.mostLikes(oneBlog)
    expect(result).toEqual({
      author: "Brian Kernighan, Dennis Ritchie",
      likes: 8
    })
  })

  test('of many blogs is correct', () => {
    const result = listHelper.mostLikes(manyBlogs)
    expect(result).toEqual({
      author: "Martin Fowler",
      likes: 44
    })
  })
})