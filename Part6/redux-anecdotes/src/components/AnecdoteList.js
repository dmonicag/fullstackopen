import { useSelector, useDispatch } from "react-redux"
import { add_vote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
  const anecdote = useSelector(({ filter, anecdotes }) => {
      const result = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
      return result      
  })  

  const dispatch = useDispatch()

  const vote = (id) => {
      dispatch(add_vote(id))
      const vote_anecdote = anecdote.find(a => a.id === id)
      dispatch(showNotification(` You voted for '${vote_anecdote.content}'`))
  }

  return (
    <div>
      {anecdote
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has <b>{anecdote.votes}</b> votes &ensp;
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          </div>
        )}
    </div>
  )
}
export default AnecdoteList