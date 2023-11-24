import axios from "axios"

const baseurl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(baseurl)
    return res.data
}

export default { getAll }
