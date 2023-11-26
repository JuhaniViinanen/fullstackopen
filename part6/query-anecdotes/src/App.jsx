import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteForAnecdote } from "./requests"
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false
  })
  //console.log(JSON.parse(JSON.stringify(result)))

  const queryClient = useQueryClient()
  const anecdoteVoteMutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      const updated = anecdotes.map(anecdote => 
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
      queryClient.setQueryData(["anecdotes"], updated)
      dispatch({
        type: "SET",
        payload: `anecdote '${updatedAnecdote.content}' voted.`
      })
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000)
    }
  })

  if (result.isPending) {
    return <div>loading anecdotes...</div>
  } else if (result.isError) {
    return <div>Anecdotes service not available due to problems in the server.</div>
  }

  const anecdotes = result.data

  const handleVote = anecdote => anecdoteVoteMutation.mutate(anecdote)

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
