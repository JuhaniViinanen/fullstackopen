import { useState } from "react"

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({ blog }) => {
    const [detailsVisible, setDetailsVisible] = useState(false)

    const handleLike = event => {
        console.log(`liked the blog ${blog.title}`)
    }

    const simple = () => (
        <div>
            <p>{blog.title} {blog.author}</p>
            <button onClick={() => setDetailsVisible(true)}>more</button>
        </div>
    )

    const details = () => (
        <div>
            <p>{blog.title} {blog.author}</p>
            <p>{blog.url}</p>
            <p>
                {blog.likes}
                <button onClick={handleLike}>like</button>
            </p>
            <p>{blog.user.username}</p>
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
