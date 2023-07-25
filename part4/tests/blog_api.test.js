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


describe("GET /api/blogs", () => {
    test("returns all blogs in database as json", async () => {
        const res = await api.get("/api/blogs")
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/application\/json/)
        expect(res.body).toHaveLength(initBlogs.length)
    })

    test("names the unique identifier of a blog as id", async () => {
        const res = await api.get("/api/blogs")
        expect(res.body[0].id).toBeDefined()
    })
})

describe("POST /api/blogs", () => {
    test("correctly saves the information posted into database", async () => {
        const newBlog = {
            title: "Living under the sea",
            author: "Spongebob Squarepants",
            url: "https://www.bikinibottom.se/blogs/livingunderthesea",
            likes: 13
        }
        const res = await api.post("/api/blogs").send(newBlog)
        expect(res.status).toBe(201)
        expect(res.headers["content-type"]).toMatch(/application\/json/)
        delete res.body.id
        expect(res.body).toEqual(newBlog)

        const getres = await api.get("/api/blogs")
        expect(getres.body).toHaveLength(initBlogs.length + 1)
    })

    test("uses a default value of 0 for the likes property", async () => {
        const newBlog = {
            title: "Living under the sea",
            author: "Spongebob Squarepants",
            url: "https://www.bikinibottom.se/blogs/livingunderthesea"
        }
        const res = await api.post("/api/blogs").send(newBlog)
        expect(res.status).toBe(201)
        expect(res.headers["content-type"]).toMatch(/application\/json/)
        expect(res.body.likes).toBe(0)
    })

    test("responds with status code 400 when title or url are missing", async () => {
        const noTitle = {
            author: "Spongebob Squarepants",
            url: "https://www.bikinibottom.se/blogs/livingunderthesea"
        }
        const noUrl = {
            title: "Living under the sea",
            author: "Spongebob Squarepants"
        }
        const resNoTitle = await api.post("/api/blogs").send(noTitle)
        const resNoUrl = await api.post("/api/blogs").send(noUrl)
        expect(resNoTitle.status).toBe(400)
        expect(resNoUrl.status).toBe(400)
    })
})

describe("DELETE /api/blogs/:id", () => {
    test("succeeds with status code 204 when id exists", async () => {
        const blogs = await api.get("/api/blogs")
        expect(blogs.body).toHaveLength(initBlogs.length)
        const idToDelete = blogs.body[0].id
        const res = await api.delete(`/api/blogs/${idToDelete}`)
        expect(res.status).toBe(204)
        const blogsAfter = await api.get("/api/blogs")
        expect(blogsAfter.body).toHaveLength(initBlogs.length - 1)
    })

    test("fails with status code 400 when id is malformed", async () => {
        const res = await api.delete("/api/blogs/badID")
        expect(res.status).toBe(400)
    })

    test("succeeds without changes to database when id doesn't exist", async () => {
        const blogs = await api.get("/api/blogs")
        const res = await api.delete("/api/blogs/5a422a851b54a676234d17f7")
        expect(res.status).toBe(204)
        const blogsAfter = await api.get("/api/blogs")
        expect(blogsAfter.body).toEqual(blogs.body)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})
