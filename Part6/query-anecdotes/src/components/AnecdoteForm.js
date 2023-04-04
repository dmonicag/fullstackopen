import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const [notification, dispatch] = useContext(NotificationContext)

  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (new_Anecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(new_Anecdote))
    },
    onError: () => {
      dispatch({ type: "MESSAGE", payload: "Anecdote too short. Must have length of 5 or more"})
      setTimeout(() => dispatch({ type: "CLEAR"}), 5000)
    }
  })  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    anecdoteMutation.mutate({content, votes: 0})
    dispatch({ type: "MESSAGE", payload: `Anecdote "${content}" added successfully`})
    setTimeout(() => dispatch({ type: "CLEAR"}), 5000) 
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
