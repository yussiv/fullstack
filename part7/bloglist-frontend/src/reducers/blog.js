import blogService from '../services/blog'
import { addNotification } from './notification'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  default:
    return state
  }
}

export const initBlogs = () => async (dispatch) => {
  try {
    dispatch({
      type: 'SET_BLOGS',
      data: await blogService.getAll(),
    })
  } catch (error) {
    dispatch(addNotification(`fetch failed: ${error.message}`, 'failure'))
  }
}

export const addBlog = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blog)

    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })

    dispatch(addNotification(
      `A new blog ${newBlog.title} by ${newBlog.author} added`,
      'success'
    ))
  } catch (error) {
    dispatch(addNotification(`create failed: ${error.message}`, 'failure'))
  }
}

export const updateBlog = (blog) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  } catch (error) {
    dispatch(addNotification(`update failed: ${error.message}`, 'failure'))
  }
}

export const removeBlog = (blog) => async (dispatch) => {
  try {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      id: blog.id
    })
  } catch (error) {
    dispatch(addNotification(`remove failed: ${error.message}`, 'failure'))
  }
}

export const addComment = (blog, content) => async (dispatch) => {
  try {
    const newComment = await blogService.addComment(blog.id, content)
    dispatch({
      type: 'UPDATE_BLOG',
      data: {
        ...blog,
        comments: blog.comments.concat(newComment)
      }
    })
  } catch (error) {
    dispatch(addNotification(`comment add failed: ${error.message}`, 'failure'))
  }
}

export default reducer
