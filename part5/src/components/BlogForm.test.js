import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("<BlogForm /> submits with the right values on submit", async () => {
  const user = userEvent.setup()
  const submissionHandler = jest.fn()

  const testData = {
    title: "This is a test",
    author: "Spongebob",
    url: "http://spongeblog.com"
  }

  render(<BlogForm createBlog={submissionHandler} />)

  const titleInput = screen.getByRole("textbox", { name: "title:" })
  const authorInput = screen.getByRole("textbox", { name: "author:" })
  const urlInput = screen.getByRole("textbox", { name: "url:" })
  const createButton = screen.getByRole("button", { name: "create" })

  await user.type(titleInput, testData.title)
  await user.type(authorInput, testData.author)
  await user.type(urlInput, testData.url)
  await user.click(createButton)

  expect(submissionHandler).toHaveBeenCalledTimes(1)
  expect(submissionHandler.mock.calls[0][0]).toEqual(testData)
})
