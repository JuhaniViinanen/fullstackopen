import { createSlice } from "@reduxjs/toolkit"
    
const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        voteForAnecdote(state, action) {
            const id = action.payload
            const anecdote = state.find(old => old.id === id)
            const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
            const newState = state.map(a => a.id !== id ? a : newAnecdote)
            return newState.toSorted( (a,b) => b.votes - a.votes )
        },
        createAnecdote(state, action) {
            return state.concat(action.payload)
        },
        setAnocedotes(state, action) {
            return action.payload
        }
    }
})

export const { voteForAnecdote, createAnecdote, setAnocedotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
