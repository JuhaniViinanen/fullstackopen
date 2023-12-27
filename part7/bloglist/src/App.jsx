import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  displaySuccessMessage,
  displayErrorMessage,
} from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

function App() {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessage, errorMessage] = useSelector(
    (state) => state.notifications
  );

  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      dispatch(displaySuccessMessage("login succesful.", 10));
    } catch (exception) {
      dispatch(displayErrorMessage(`${exception.response.data.error}`, 10));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
    dispatch(displaySuccessMessage("logout successful.", 10));
  };

  const handleNewBlogCreation = async (newBlog) => {
    try {
      const res = await blogService.create(newBlog);
      console.log();
      setBlogs(blogs.concat({ ...res, user: user }));
      dispatch(displaySuccessMessage(`blog ${res.title} created.`, 10));
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      dispatch(displayErrorMessage(`${exception.response.data.error}`, 10));
    }
  };

  const handleLike = async (blogId, newLikes) => {
    try {
      const res = await blogService.like(blogId, newLikes);
      const newBlogs = blogs.map((blog) =>
        blog.id === res.id ? { ...blog, likes: res.likes } : blog
      );
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        dispatch(
          displaySuccessMessage(`${blog.title} by ${blog.author} deleted`, 10)
        );
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const blogsForm = () => (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleNewBlogCreation} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeFunction={handleLike}
          deleteFunction={handleDelete}
          appUser={user}
        />
      ))}
    </div>
  );

  return (
    <div>
      {user === null ? <h2>log in to application</h2> : <h2>blogs</h2>}
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      {user === null ? <LoginForm loginFunction={handleLogin} /> : blogsForm()}
    </div>
  );
}

export default App;
