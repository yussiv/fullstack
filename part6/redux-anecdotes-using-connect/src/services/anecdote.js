import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const add = async (anecdote) => {
  try {
    const response = await axios.post(`${baseUrl}`, anecdote)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const put = async (anecdote) => {
  try {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, add, put }