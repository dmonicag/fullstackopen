import { useDispatch } from "react-redux"
import { new_anecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () =>{
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value=''
    try{
      dispatch(new_anecdote(anecdote))
      dispatch(showNotification(`'${anecdote}' added successfully`, 5)) 
    }
    catch(error){
      dispatch(showNotification(error, 5))
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