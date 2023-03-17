const BlogForm = ({addBlog}) => {
  return(
    <form onSubmit={addBlog}>
      <div>
        <h2>Add a new Blog</h2>
        <p>Title: <input type='text' name='title'/></p>
        <p>Author: <input type='text' name='author'/></p>
        <p> URL: <input type='text' name='url'/></p>
        <p><button type='submit'>Add Blog</button></p>
      </div>
    </form>
  )
}
export default BlogForm