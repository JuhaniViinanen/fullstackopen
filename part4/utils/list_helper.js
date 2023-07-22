const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce( (total, current) => total + current.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) return {}
    const likes = blogs.map(blog => blog.likes)
    const favoriteIndex = likes.indexOf(Math.max(...likes))
    return blogs[favoriteIndex]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
