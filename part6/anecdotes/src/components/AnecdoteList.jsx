import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === "") return anecdotes
        return anecdotes.filter(anecdote => {
            return anecdote.content.toLowerCase().includes(filter.toLowerCase())
        })
    })

    const dispatch = useDispatch()

    const vote = anecdote => {
        dispatch(voteForAnecdote(anecdote))
        dispatch(setNotification(`You voted for "${anecdote.content}"`, 5))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList
