import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}/anecdotes`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const add = async (anecdote) => {
  try {
    const response = await axios.post(`${baseUrl}/anecdotes`, anecdote)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, add }