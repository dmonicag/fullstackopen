import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    update_vote(state, action) {
      const id = action.payload.id
      const updatedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote)
      },

      appendAnecdote(state, action) {
        state.push(action.payload)
      },

      setAnecdotes(state, action) {
        return action.payload
      }
    }
  }
)

export const { update_vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const new_anecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const add_vote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.updateVotes(id)
    dispatch(update_vote(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer