import { useState, useEffect, useRef } from 'react'
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import SuccessMessage from "./components/SuccessMessage"
import ErrorMessage from "./components/ErrorMessage"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const blogFormRef = useRef()

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

  const handleNewBlogCreation = async newBlog => {
    try {
      const res = await blogService.create(newBlog)
      setBlogs(blogs.concat({...res, user: { username: user.username }}))
      showSuccessMessage(`blog ${res.title} created.`)
      blogFormRef.current.toggleVisibility()
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

  // TODO: Togglable needs to close when blog is created
  const blogsForm = () => (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={ handleLogout }>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleNewBlogCreation} />
      </Togglable>
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
      {user === null ? loginForm() : blogsForm() }
    </div>
  )
}

export default App
