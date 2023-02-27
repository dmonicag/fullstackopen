const Blog = require('../models/bloglist')

const initialBlogList = [
    {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    },
    {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
    }
]

const nonExistID = async () => {
    const blog = new Blog({ title: "inital blog"})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogs_in_db = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogList, nonExistID, blogs_in_db }