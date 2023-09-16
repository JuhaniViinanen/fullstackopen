import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
  const blog = {
    "title": "Title of the blog",
    "author": "Author of the blog",
    "url": "URL address of the blog",
    "likes": 0,
    "user": {
      "username": "username of the blog's creator"
    }
  }

  const user = {
    "username": "username of the blog's creator"
  }

  test("renders title and author only by default", () => {
    render(
      <Blog
        blog={blog}
        likeFunction={jest.fn()}
        deleteFunction={jest.fn()}
        appUser={user}
      />
    )
    screen.getByText(blog.title, { exact: false })
    screen.getByText(blog.author, { exact: false })
    expect(screen.queryByText(blog.url, { exact: false })).toBeNull()
    expect(screen.queryByText(blog.likes, { exact: false })).toBeNull()
  })
})
