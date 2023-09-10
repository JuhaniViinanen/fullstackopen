import { useState } from "react"

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({ blog, likeFunction }) => {
    const [detailsVisible, setDetailsVisible] = useState(false)

    const simple = () => (
        <div>
            <div>{blog.title} {blog.author}</div>
            <button onClick={() => setDetailsVisible(true)}>more</button>
        </div>
    )

    const details = () => (
        <div>
            <div>{blog.title} {blog.author}</div>
            <div>{blog.url}</div>
            <div>
                {blog.likes}
                <button onClick={() => likeFunction(blog.id, blog.likes + 1)}>like</button>
            </div>
            <div>{blog.user.username}</div>
            <button onClick={() => setDetailsVisible(false)}>less</button>
        </div>
    )

    return (
        <div style={blogStyle}>
            {detailsVisible ? details() : simple()}
        </div>

    )
}

export default Blog
