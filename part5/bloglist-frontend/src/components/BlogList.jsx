import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>

      <ul>
        {[...blogs]
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map(blog => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList
