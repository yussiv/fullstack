import blogService from '../services/blog'
import { addNotification } from './notification'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.data)
  default:
    return state
  }
}

export const initBlogs = () => async (dispatch) => {
  dispatch({
    type: 'SET_BLOGS',
    data: await blogService.getAll(),
  })
}

export const addBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog)

  dispatch({
    type: 'ADD_BLOG',
    data: newBlog,
  })

  dispatch(addNotification(
    `A new blog ${newBlog.title} by ${newBlog.author} added`,
    'success'
  ))
}

export default reducer
