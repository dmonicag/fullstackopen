import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlogObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlogObject, config)
  return response.data
}

const updateLikes = async (updatedObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getByID = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addComment = async (comment ,id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default { getAll, setToken, create, updateLikes, deleteBlog, getByID, addComment }