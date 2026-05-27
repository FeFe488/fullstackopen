import { useState } from "react"

const Blog = ({ blog , updateBlog, deleteBlog}) => {

  const [visible,setVisible]=useState(false)


  const toggleVisbility = ()=>{
    setVisible(!visible)
  }

  const handleLike = () =>{
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    updateBlog(blog.id,updatedBlog)
  }

  const handleDeletion = () => {
     deleteBlog(blog.id)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle= {
    backgroundColor: 'red',
    border:'none'
  }


  if(!visible){
  return(
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisbility}> view</button>
    </div>
  </div>
  )
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisbility}> view</button>
      </div>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={handleLike}>like</button></div>
      <div>{blog.user.username}</div>
      <div><button onClick={handleDeletion} >remove</button></div>
    </div>
  )
}

export default Blog