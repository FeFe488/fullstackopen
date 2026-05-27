import { useState } from "react"

const Blog = ({ blog }) => {

  const [visible,setVisible]=useState(false)
  const [like,setLike]=useState(blog.likes)

  const toggleVisbility = ()=>{
    setVisible(!visible)
  }

  const handleLike = () =>{
    setLike(+1)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
      <div>{blog.user.name}</div>
    </div>
  )
}

export default Blog