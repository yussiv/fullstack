const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) => {
    if (!fav.likes || fav.likes < blog.likes)
     return blog
    else
      return fav
  }, {})
}

const mostBlogs = (blogs) => {
  const authorCounts = blogs.reduce((counts, blog) => {
    if (!counts[blog.author])
     counts[blog.author] = { author: blog.author, blogs: 0 }
    
    counts[blog.author].blogs++
    return counts
  }, {})

  return Object.values(authorCounts).reduce((max, author) => {
    if (!max.blogs || max.blogs < author.blogs)
     return author
    else
      return max
  }, {})
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((counts, blog) => {
    if (!counts[blog.author])
     counts[blog.author] = { author: blog.author, likes: 0 }
    
    counts[blog.author].likes += blog.likes
    return counts
  }, {})

  return Object.values(authorLikes).reduce((max, author) => {
    if (!max.likes || max.likes < author.likes)
     return author
    else
      return max
  }, {})
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}