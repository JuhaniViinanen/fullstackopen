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

  test("shows url and likes after \"more\" button is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Blog
        blog={blog}
        likeFunction={jest.fn()}
        deleteFunction={jest.fn()}
        appUser={user}
      />
    )
    const moreButton = screen.getByText("more")
    await user.click(moreButton)
    screen.getByText(blog.url, { exact: false })
    screen.getByText(blog.likes, { exact: false })
  })

  test("like function is called twice when like button is clicked twice", async () => {
    const user = userEvent.setup()
    const addLike = jest.fn()
    render(
      <Blog
        blog={blog}
        likeFunction={addLike}
        deleteFunction={jest.fn()}
        appUser={user}
      />
    )
    const moreButton = screen.getByText("more")
    await user.click(moreButton)
    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)
    expect(addLike.mock.calls).toHaveLength(2)
  })
})
