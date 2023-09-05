import axios from "axios"
axios.defaults.baseURL = "http://localhost:3003"
const baseURL = "/api/blogs"

const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

export default { getAll }
