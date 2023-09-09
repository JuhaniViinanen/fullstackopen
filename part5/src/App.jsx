import { useState, useEffect } from 'react'
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import SuccessMessage from "./components/SuccessMessage"
import ErrorMessage from "./components/ErrorMessage"

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout( () => setSuccessMessage(""), 5000 )
  }

  const showErrorMessage = message => {
    setErrorMessage(message)
    setTimeout( () => setErrorMessage(""), 5000 )
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      showSuccessMessage("login succesful.")
    } catch (exception) {
      showErrorMessage(`${exception.response.data.error}`)
    }
    setUsername("")
    setPassword("")
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    setUser(null)
    blogService.setToken(null)
    showSuccessMessage("logout successful.")
  }

  const handleNewBlogCreation = async event => {
    event.preventDefault()
    try {
      const res = await blogService.create({ author, title, url })
      setAuthor("")
      setTitle("")
      setUrl("")
      setBlogs(blogs.concat(res))
      showSuccessMessage(`blog ${res.title} created.`)
    } catch (exception) {
      showErrorMessage(`${exception.response.data.error}`)
    }
  }

  const loginForm = () => (
    <div>
      <form onSubmit={ handleLogin }>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogsForm = () => (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={ handleLogout }>logout</button>
      </div>
      <form onSubmit={ handleNewBlogCreation }>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="URL"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        <h2>log in to application</h2> :
        <h2>blogs</h2>
      }
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      {user === null ? loginForm() : blogsForm()}
    </div>
  )
}

export default App
