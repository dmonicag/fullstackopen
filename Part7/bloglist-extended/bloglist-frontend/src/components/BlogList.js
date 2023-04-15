import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    const result = [...blogs].sort((a,b) => b.likes - a.likes)
    return result
  })

  return(
    <div>
      <h2>List of blogs</h2>
      {blogs.map(blog =>
        <ul key={blog.id}>
          <li>
            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
          </li>
        </ul>)
      }
    </div>
  )
}

export default BlogList