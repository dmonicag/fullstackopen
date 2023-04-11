import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify } from './NotificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    },
    updateLike(state, action){
      const id = action.payload.id
      const updated_blog = action.payload
      return state.map(blog =>
        blog.id !== id ? blog : updated_blog)
    },
    removeBlog(state, action){
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, updateLike, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
    dispatch(initializeBlogs())
  }
}

export const add_Like = (blog, id) => {
  return async dispatch => {
    const updated = await blogService.updateLikes(blog, id)
    dispatch(updateLike(updated))
  }
}

export const delete_Blog = (blog) => {
  return async dispatch => {
    try{
      await blogService.deleteBlog(blog.id)
      dispatch(removeBlog(blog.id))
    }
    catch(error){
      dispatch(notify(error.message, 'error'))
    }
  }
}

export default blogSlice.reducer