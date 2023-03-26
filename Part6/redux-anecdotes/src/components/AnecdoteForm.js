import { useDispatch } from "react-redux"
import { new_anecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"
import anecdotesService from "../services/anecdotes"

const AnecdoteForm = () =>{
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value=''
    try{
      const newAnecdote = await anecdotesService.createAnecdote(anecdote)
      dispatch(new_anecdote(newAnecdote))
      dispatch(showNotification(`'${anecdote}' added successfully`))      
    }
    catch(error){
      dispatch(showNotification(error))
    }
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