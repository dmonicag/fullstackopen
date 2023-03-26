import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByID = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data  
}

const createAnecdote = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (id) => {
  const anecdoteToUpdate = await getByID(id)
  const update_anecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, update_anecdote)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createAnecdote, updateVotes }