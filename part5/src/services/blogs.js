import axios from "axios"
axios.defaults.baseURL = "http://localhost:3003"
const baseURL = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(baseURL, newBlog, config)
    return res.data
}

export default { setToken, getAll, create }
