import axios from 'axios'
const baseUrl = '/login'

const login = async (username, password) => {
  const res = await axios.post(baseUrl, { username, password })
  return res.data
}

export default { login }