const blogsRouter = require("express").Router()
const Blog =  require("../models/blog")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post("/", async (req, res, next) => {
  try {
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, context: "query", new: true }
    )
    res.status(200).json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
