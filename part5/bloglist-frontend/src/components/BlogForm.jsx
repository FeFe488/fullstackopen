

import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'




const BlogForm = ({ createBlog }) => {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
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

      <Box
        component="form"
        onSubmit={addBlog}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <div>
          <TextField
            label="title:"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder='write title here'
          />
        </div>
        
        <div>
          <TextField  
            label ="author:"
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='write author here'
          />
        </div>

        <div>
          <TextField
            label= "url:"
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder='write url here'
            />
        </div>

        <div>
          <Button type="submit" variant="contained" >
            create
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default BlogForm