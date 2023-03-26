import { useDispatch } from "react-redux"
import { new_anecdote } from "../reducers/anecdoteReducer"
const AnecdoteForm = () =>{
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value=''
    dispatch(new_anecdote(anecdote))
  }

  return(
    <div>
      <h2>create new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote'/>&ensp;
        <button type='submit'>create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm