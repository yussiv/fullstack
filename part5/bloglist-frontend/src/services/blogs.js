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
  try {
    const response = await axios.post(baseUrl, blog, axiosConfig)
    return response.data
  } catch (err) {
    console.error(err)
  }
}

export default { getAll, create, setToken }