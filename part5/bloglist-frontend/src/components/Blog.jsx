

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    updateBlog(blog.id, updatedBlog)
  }

  const handleDeletion = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const ownerName = blog.user
    ?  blog.user.name
    : 'unknown'

  const allowedToRemove =
    user &&
    blog.user &&
    blog.user.username === user.username

  return (
    <div className="blog">
      <h2>
        {blog.author}: {blog.title}
      </h2>

      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>

      <div>
        likes {blog.likes}
        {user && (
          <button onClick={handleLike}>like</button>
        )}
      </div>

      <div>
        Added by {ownerName}
      </div>

      {allowedToRemove && (
        <button onClick={handleDeletion}>
          remove
        </button>
      )}
    </div>
  )
}

export default Blog