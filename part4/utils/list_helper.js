const _ = require("lodash")

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce( (total, current) => total + current.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) return null
    const likes = blogs.map(blog => blog.likes)
    const favoriteIndex = likes.indexOf(Math.max(...likes))
    return blogs[favoriteIndex]
}

const mostBlogs = blogs => {
    if (blogs.length === 0) return null
    const authorCounts = _.countBy(blogs, "author")
    const highestCount = Math.max(...Object.values(authorCounts))
    const authorName = _.findKey(authorCounts, e => e === highestCount)
    return {
        "author": authorName,
        "blogs": highestCount
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
