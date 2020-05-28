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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}