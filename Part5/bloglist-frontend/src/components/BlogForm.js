const BlogForm = ({createBlog}) => {

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value 
    const author = event.target.author.value
    const url = event.target.url.value
    createBlog({title: title, 
                author:author, 
                url:url})
    event.target.reset()
  }
    
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