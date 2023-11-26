import axios from "axios"

const baseurl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () => axios.get(baseurl).then(res => res.data)

export const createAnecdote = content => {
    return axios.post(baseurl, {content, votes: 0}).then(res => res.data)
}

export const voteForAnecdote = anecdote => {
    return axios
    .put(`${baseurl}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1})
    .then(res => res.data)
}
