

import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label>
        <input
            type='title'
            value={title}
            onChange={event => setTitle(event.target.value)}
        />
        </label>
        <label>
        <input
            type='author'
            value={author}
            onChange={event => setAuthor(event.target.value)}
        />
        </label>
        <label>
        <input
            type='url'
            value={url}
            onChange={event => setUrl(event.target.value)}
        />
        </label>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm