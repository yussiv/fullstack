const listHelper = require('../utils/list_helper')

const emptyBlogs = []

const oneBlog = [
  {
    "title": "The C Programming Language",
    "author": "Brian Kernighan, Dennis Ritchie",
    "url": "https://archive.org/details/TheCProgrammingLanguageFirstEdition",
    "likes": 8
  }
]

const manyBlogs = [
  {
    "title": "The C Programming Language",
    "author": "Brian Kernighan, Dennis Ritchie",
    "url": "https://archive.org/details/TheCProgrammingLanguageFirstEdition",
    "likes": 8
  },
  {
    "title": "The Go Programming Language",
    "author": "Robert Griesemer, Rob Pike, Ken Thompson",
    "url": "https://golang.org/",
    "likes": 1
  },
  {
    "title": "Patterns for Managing Source Code Branches",
    "author": "Martin Fowler",
    "url": "https://martinfowler.com/articles/branching-patterns.html",
    "likes": 42
  },
  {
    "title": "The Go Programming Language ",
    "author": "Uncle Bob",
    "url": "http://blog.cleancoder.com/uncle-bob/2020/05/27/ReplDrivenDesign.html",
    "likes": 7
  },
  {
    "title": "KeystoneInterface",
    "author": "Martin Fowler",
    "url": "https://martinfowler.com/bliki/KeystoneInterface.html",
    "likes": 2
  }
]

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

  test('of one blog is correct', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(8)
  })

  test('of three blogs is correct', () => {
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