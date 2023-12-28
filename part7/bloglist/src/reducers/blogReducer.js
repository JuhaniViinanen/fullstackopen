import { createSlice } from "@reduxjs/toolkit";
import {
  displaySuccessMessage,
  displayErrorMessage,
} from "./notificationReducer";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    replaceBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const { setBlogs, appendBlog, replaceBlog, removeBlog } =
  blogSlice.actions;

export const initalizeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog, user) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      dispatch(appendBlog({ ...createdBlog, user: user }));
      dispatch(displaySuccessMessage(`blog ${newBlog.title} created.`, 10));
    } catch (exception) {
      dispatch(displayErrorMessage(`${exception.response.data.error}`, 10));
    }
  };
};

export const likeBlog = (blog, newLikes) => {
  return async (dispatch) => {
    try {
      const res = await blogService.like(blog.id, newLikes);
      const newBlog = { ...blog, likes: res.likes };
      dispatch(replaceBlog(newBlog));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const res = await blogService.remove(blog.id);
      dispatch(removeBlog(blog));
      dispatch(
        displaySuccessMessage(`${blog.title} by ${blog.author} deleted`, 10)
      );
    } catch (exception) {
      console.log(exception);
    }
  };
};

export default blogSlice.reducer;
