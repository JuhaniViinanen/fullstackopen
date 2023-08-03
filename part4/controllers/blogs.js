const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const getTokenFrom = request => {
  const auth = request.get("authorization")
  if (auth && auth.startsWith("bearer ")) {
    return auth.replace("bearer ", "")
  }
  return null
}

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post("/", async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.CYPHER)
    if (!decodedToken.id) {
      return res.status(401).json({ error: "invalid token" })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      ...req.body,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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
