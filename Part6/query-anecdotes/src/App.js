import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import  { getAnecdotes, updateVote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const anecdoteVoteMutation = useMutation(updateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const result = useQuery('anecdotes', getAnecdotes, { retry: false }, { refetchOnWindowFocus: false })

  if(result.isLoading){
    return <div>Loading....</div>
  }
  else if(result.isError){
    return <div>Anecdote Service not available due to problems in server</div>
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    anecdoteVoteMutation.mutate({...anecdote, votes: anecdote.votes+1})   
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
