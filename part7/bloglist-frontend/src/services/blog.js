import axios from 'axios'
const baseUrl = '/api/blogs'

const axiosConfig = {}

const setToken = (newToken) => {
  axiosConfig.headers = {
    Authorization: `bearer ${newToken}`
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, axiosConfig)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, axiosConfig)
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    ...blog, user: blog.user.id
  }, axiosConfig)
  return response.data
}

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, axiosConfig)
  return response.data
}

export default { getAll, create, setToken, update, remove }