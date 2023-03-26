import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    new_anecdote(state, action) {
      state.push(action.payload)
    },

    add_vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const updatedVote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes+1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : updatedVote)
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

export const { new_anecdote, add_vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer