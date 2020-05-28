const listHelper = require('../utils/list_helper')

describe('total likes', () => {

  const emptyBlogs = []

  const oneBlog = [
    {
      "_id": "5ed0160baa9badeb17b6f585",
      "title": "The C Programming Language",
      "author": "Brian Kernighan, Dennis Ritchie",
      "url": "https://archive.org/details/TheCProgrammingLanguageFirstEdition",
      "likes": 42,
      "__v": 0
    }
  ]

  const threeBlogs = [
    {
      "_id": "5ed0160baa9badeb17b6f585",
      "title": "The C Programming Language",
      "author": "Brian Kernighan, Dennis Ritchie",
      "url": "https://archive.org/details/TheCProgrammingLanguageFirstEdition",
      "likes": 42,
      "__v": 0
    },
    {
      "_id": "5ed01692aa9badeb17b6f586",
      "title": "The C++ Programming Language",
      "author": "Bjarne Stroustrup",
      "url": "http://www.stroustrup.com/books.html",
      "likes": 8,
      "__v": 0
    },
    {
      "_id": "5ed01d93b7dc40f26a6ef17a",
      "title": "The Go Programming Language ",
      "author": "Robert Griesemer, Rob Pike, Ken Thompson",
      "url": "https://golang.org/",
      "likes": 5,
      "__v": 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

  test('of one blog is correct', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(42)
  })

  test('of three blogs is correct', () => {
    const result = listHelper.totalLikes(threeBlogs)
    expect(result).toBe(55)
  })
})
