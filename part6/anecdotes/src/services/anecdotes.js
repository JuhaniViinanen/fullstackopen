import axios from "axios"

const baseurl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(baseurl)
    return res.data
}

const createAnecdote = async content => {
    const newAnecdote = { content, votes: 0 }
    const res = await axios.post(baseurl, newAnecdote)
    return res.data
}

const update = async anecdote => {
    const res = await axios.put(`${baseurl}/${anecdote.id}`, anecdote)
    return res.data
}

export default { getAll, createAnecdote, update }
