import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === "") return anecdotes
        return anecdotes.filter(anecdote => {
            return anecdote.content.toLowerCase().includes(filter.toLowerCase())
        })
    })

    const dispatch = useDispatch()

    const vote = anecdote => {
        dispatch(voteForAnecdote(anecdote.id))
        dispatch(displayNotification(`You voted for "${anecdote.content}"`))
        setTimeout(() => dispatch(removeNotification()), 5000)
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
