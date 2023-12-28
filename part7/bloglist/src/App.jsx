import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initalizeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { initalizeUser, loginUser, logoutUser } from "./reducers/userReducer";

import Blog from "./components/Blog";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import { createSelector } from "@reduxjs/toolkit";
const selectBlogs = createSelector([(state) => state.blogs], (blogs) =>
  [...blogs].sort((a, b) => b.likes - a.likes)
);

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const user = useSelector((state) => state.user);
  const [successMessage, errorMessage] = useSelector(
    (state) => state.notifications
  );

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initalizeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initalizeUser());
  }, []);

  const handleLogin = (username, password) => {
    dispatch(loginUser(username, password));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleNewBlogCreation = (newBlog) => {
    dispatch(createBlog(newBlog, user));
    blogFormRef.current.toggleVisibility();
  };

  const handleLike = (blog, newLikes) => {
    dispatch(likeBlog(blog, newLikes));
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
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
