const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

const initBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = initBlogs.map(blog => new Blog(blog))
    await Promise.all( blogs.map(blog => blog.save()) )
})


test("GET /api/blogs returns all blogs as json", async () => {
    const res = await api.get("/api/blogs")
    expect(res.status).toBe(200)
    expect(res.headers["content-type"]).toMatch(/application\/json/)
    expect(res.body).toHaveLength(initBlogs.length)
})


afterAll(async () => {
    mongoose.connection.close()
})
