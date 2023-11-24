import anecdoteService from "../services/anecdotes"
import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        updateAnecdote(state, action) {
            const id = action.payload.id
            const newState = state.map(a => a.id !== id ? a : action.payload)
            return newState.toSorted((a,b) => b.votes - a.votes)
        },
        setAnecdotes(state, action) {
            return action.payload.toSorted((a,b) => b.votes - a.votes)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createAnecdote(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteForAnecdote = anecdote => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
        dispatch(updateAnecdote(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer
